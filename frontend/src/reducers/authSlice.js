import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  token: false,
  userID: "",
  expTime: null,
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
    login: (state, action) => {
      const { token, username, userID, exp } = action.payload;
      state.token = token;
      state.username = username;
      state.userID = userID;

      //idea: I should create a separate function containing these elements, and then import that into the necessary files
      //this is the remaining login functionality, need to determine where to implement it

      // // AUTO LOGOUT TIME SET (YOU CAN PLAY AROUND WITH THAT TIME TO AUTO LOGOUT)
      // const hourInMili = 1000 * 60 * 60;
      // // const tenSecInMili = 10000;

      // // SET TO EITHER EXP TIME FROM PREV OR CURRENT TIME + 1 Hour
      // const autoLogoutTime = exp || new Date(new Date().getTime() + hourInMili);

      // state.expTime = autoLogoutTime;
      // //writes data to local storage
      // localStorage.setItem(
      //   "data",
      //   JSON.stringify({
      //     token: token,
      //     username: user,
      //     userID: userID,
      //     expireTime: autoLogoutTime.toISOString(),
      //   })
      // );
    },
  },
});

export const { logout, login, changePassword, changeUsername } =
  authSlice.actions;

export default authSlice.reducer;
