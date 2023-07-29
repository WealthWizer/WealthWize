import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const fetchTablesServiceWorker = async (userID, token) => {
  const response = await fetch(`http://localhost:3000/dashboard/${userID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const jsonData = await response.json();
  return jsonData;
};

export const fetchTables = createAsyncThunk(
  "dashboard/fetchTables",
  async (_, thunkAPI) => {
    try {
      const userData = JSON.parse(localStorage.getItem("data"));
      const { userID, token } = userData;

      const tables = await fetchTablesServiceWorker(userID, token);
      return tables;
    } catch (error) {
      //ask sean on how to best do the rejectWithValue
      thunkAPI.rejectWithValue(null);
      console.log("error in fetchTables:", error);
    }
  }
);

//need to change
const initialState = {
  dataTables: {},
  sidebar: false,
  rerender: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
    setRerender: (state, action) => {
      state.rerender = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.dataTables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {});
  },
});

// need to change
export const { setSidebar } = dashboardSlice.actions;

export default dashboardSlice.reducer;
