import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//how to let asyncthunk have access to the state
//pass it in
//thunkAPI get state hook

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const currentState = thunkAPI.getState();
    const { username, password, expTime } = currentState.auth;

    const response = await axios.post("http://localhost:3000/api/users/login", {
      username,
      password,
    });

    if (response.data.token) {
      const { token, username, userID } = response.data;

      // AUTO LOGOUT TIME SET (YOU CAN PLAY AROUND WITH THAT TIME TO AUTO LOGOUT)
      const hourInMili = 1000 * 60 * 60;
      // const tenSecInMili = 10000;

      // SET TO EITHER EXP TIME FROM PREV OR CURRENT TIME + 1 Hour
      const autoLogoutTime =
        expTime || new Date(new Date().getTime() + hourInMili);

      //writes data to local storage
      localStorage.setItem(
        "data",
        JSON.stringify({
          token: token,
          username: username,
          userID: userID,
          expireTime: autoLogoutTime.toISOString(),
        })
      );

      const result = Object.assign({}, response.data, {
        expTime: autoLogoutTime,
      });
      console.log(result);
      return result;
    }
  } catch (err) {
    //rewrite to make it more lexical - Jay
    console.log(err);
  }
});

const initialState = {
  username: "",
  password: "",
  token: false,
  userID: "",
  expTime: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = null;
      state.expTime = null;
      state.token = false;
      state.username = "";
      state.userID = "";

      //remove data from local storage
      localStorage.removeItem("data");
    },
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token, username, userID, expTime } = action.payload;
      state.token = token;
      state.username = username;
      state.userID = userID;
      if (expTime) state.expTime = expTime;

      //once isLoggedIn is set to true, then the useEffect hook in the LoginPage will redirect to authSlice
      state.isLoggedIn = true;
    });
  },
});

export const { logout, changePassword, changeUsername } = authSlice.actions;

export default authSlice.reducer;
