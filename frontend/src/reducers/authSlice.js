import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  token: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    changeUsername: (state, action) => {
      state.username = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
    login: (state, action) => {
      const { token, username, userID } = action.payload;
      state.token = token;
      state.username = username;
      state.userID = userID;
      console.log(state.token, state.username, state.userID);
    },
  },
});

export const { setCredentials, logout, login, changePassword, changeUsername } =
  authSlice.actions;

export default authSlice.reducer;
