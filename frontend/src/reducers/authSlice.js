import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const readLS = () => {};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const currentState = thunkAPI.getState();
    const { user, pass } = currentState.auth;

    const response = await axios.post("http://localhost:3000/api/users/login", {
      user,
      pass,
    });

    if (response.data.token) {
      const { username, token, userID } = response.data;

      // AUTO LOGOUT TIME SET (YOU CAN PLAY AROUND WITH THAT TIME TO AUTO LOGOUT)
      const hourInMili = 1000 * 60 * 60;
      // const tenSecInMili = 10000;

      // SET TO EITHER EXP TIME FROM PREV OR CURRENT TIME + 1 Hour
      const autoLogoutTime = new Date(new Date().getTime() + hourInMili);

      //writes data to local storage for authentication purposes
      localStorage.setItem(
        "data",
        JSON.stringify({
          token: token,
          username: username,
          userID: userID,
          expireTime: autoLogoutTime.toISOString(),
        })
      );

      //return an object combining response data + autoLogoutTime
      return response.data;
    }
  } catch (err) {
    console.log("error in authSlice login:", err);
  }
});

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (test, thunkAPI) => {
    try {
      //read local storage
      const ls = JSON.parse(localStorage.getItem("data"));

      console.log("here");
      //if local storage doesn't have a session, return false for sessionValid to
      if (!ls) return false;

      const { token, expireTime } = ls;

      const currentTime = new Date();

      //is session hasn't timed out, then set sessionValid to true, otherwise set it false
      if (token && expireTime > currentTime) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log("error in checkSession: ", err);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    try {
      localStorage.removeItem("data");
    } catch (err) {
      console.log("error in authSlice logout:", err);
    }
  }
);

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
        const { token, username, userID } = action.payload;
        state.token = token;
        state.username = username;
        state.userID = userID;

        //once sessionValid is set to true, then the useEffect hook in the LoginPage will redirect to authSlice
        state.sessionValid = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.username = "";
        state.sessionValid = false;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        const sessionStatus = action.payload;
        state.sessionValid = sessionStatus;
      });
  },
});

export const { changePassword, changeUsername } = authSlice.actions;

export default authSlice.reducer;
