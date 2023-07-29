import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slice";
import authReducer from "./reducers/authSlice";
import goalReducer from "./reducers/goalSlice";
import stockReducer from "./reducers/stockSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    stocks: stockReducer
    // counter: counterReducer,
  },
});
