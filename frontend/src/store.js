import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slice";
import authReducer from "./slices/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    // counter: counterReducer,
  },
});
