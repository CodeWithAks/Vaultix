import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
    balance:0,
    loading: false,
    error: null,
};

export const fetchBalance = createAsyncThunk(
  "account/fetchBalance",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/account/balance");

      return response.data.balance;
    } catch (error) {
      return thunkAPI.rejectWithValue( 
        error.response?.data?.message || "Failed to fetch balance"
      );
    }
  }
);

const accountSlice = createSlice({
  name: "account",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // loading state
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // success state
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })

      // error state
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default accountSlice.reducer;