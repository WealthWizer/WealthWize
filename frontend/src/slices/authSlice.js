import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  // username:
  // password:
  // status: "success",
  //     token: generateToken(result),
  //     username: result.rows[0].username,
  //     userID: result.rows[0].id,
  username: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    handlePasswordChange: (state, action) => {
      state.username = action.payload;
      userInfo.username = action.payload;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
