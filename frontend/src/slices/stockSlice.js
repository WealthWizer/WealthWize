import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    stockPortfolio: [], // Array to store the user's purchased stocks
  },
  reducers: {
    addStock: (state, action) => {
      state.stockPortfolio.push(action.payload);
    },
    // You can define other actions here if needed
  },
});

export const { addStock } = stockSlice.actions;

export default stockSlice.reducer;