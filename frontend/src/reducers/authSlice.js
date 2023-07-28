import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const loginServiceWorker = async (username, password) => {
  const response = await axios.post("http://localhost:3000/api/users/login", {
    username,
    password,
  });

  const { data } = response;

  if (data.hasOwnProperty("token")) {
    const { username, token, userID } = response.data;

    const currentTime = new Date();
    const currentTimeInMiliSec = currentTime.getTime();
    const expireTime = currentTimeInMiliSec + 10000;

    //writes data to local storage for authentication purposes
    localStorage.setItem(
      "data",
      JSON.stringify({
        token: token,
        username: username,
        userID: userID,
        expireTime: expireTime,
      })
    );
    //return an object combining response data
    return data;
  }
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const currentState = thunkAPI.getState();
    const { username, password } = currentState.auth;

    const response = await loginServiceWorker(username, password);

    if (response.token) return response;
    else return thunkAPI.rejectWithValue(null);
  } catch (err) {
    console.log("error in authSlice login:", err);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    localStorage.removeItem("data");
  } catch (err) {
    console.log("error in authSlice logout:", err);
  }
});

const initialState = {
  username: "",
  password: "",
  sessionValid: false,
  loginFail: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        //once sessionValid is set to true, then the useEffect hook in the LoginPage will redirect to authSlice
        state.sessionValid = true;
        state.loginFail = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginFail = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.username = "";
        state.sessionValid = false;
      });
  },
});

export const { changePassword, changeUsername } = authSlice.actions;

export default authSlice.reducer;
