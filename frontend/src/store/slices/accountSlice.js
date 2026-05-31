import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from "../../api/axios";

const initialState = {
    balance:0,
    loading: false,
    error: null,
};

export const fetchBalance = createAsyncThunk(
  "account/fetchBalance",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/accounts/balance");

      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE DATA:", response.data);


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
        console.log("PAYLOAD:", action.payload);
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