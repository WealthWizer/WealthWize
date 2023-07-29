import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slice";
import authReducer from "./reducers/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    // counter: counterReducer,
  },
});
