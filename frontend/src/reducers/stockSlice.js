// // reducers/stockSlice.js (using Redux Toolkit)
// import { createSlice } from "@reduxjs/toolkit";

// const stockSlice = createSlice({
//   name: "stock",
//   initialState: {
//     stockPortfolio: {}, // store user's purchased stocks, stock symbols as keys and num of shares as values
//   },
//   reducers: {
//     addStock: (state, action) => {
//       const { stockSymbol, price, date, quantity } = action.payload;
//       if (state.stockPortfolio[stockSymbol]) {
//         // If the stock symbol already exists, update the quantity
//         state.stockPortfolio[stockSymbol].quantity += quantity;
//       } else {
//         // If the stock symbol does not exist, add a new entry
//         state.stockPortfolio[stockSymbol] = {
//           price,
//           date,
//           quantity,
//         };
//       }
//     },
//   },
// });

// export const { addStock } = stockSlice.actions;
// export default stockSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stocks",
  initialState: [],
  reducers: {
    setStocks(state, action) {
      return action.payload;
    },
    addStock(state, action) {
      state.push(action.payload);
    },
    deleteStock(state, action) {
      return state.filter((stock) => stock.stock_id !== action.payload);
    },
  },
});

export const { setStocks, addStock, deleteStock } = stockSlice.actions;

export default stockSlice.reducer;

