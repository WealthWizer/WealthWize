import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slice";
import authReducer from "./reducers/authSlice";
import goalReducer from "./reducers/goalSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer
    // counter: counterReducer,
  },
});
