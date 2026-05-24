import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStats } from "../../api/stats.api";

const initialState = {
    income: 0,
    expenses: 0,
    savings: 0,
    loading: false,
    
    error: null
};

export const fetchStats = createAsyncThunk(
    "stats/fetchStats",
    async (_, thunkAPI) => {
        try {
            const data = await getStats();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.message || "Failed to fetch stats"
            )
        }
    }
);

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchStats.fulfilled, (state,action) => {
                state.loading = false;
                state.income = action.payload.income;
                state.expenses = action.payload.expenses;
                state.savings = action.payload.savings;
            })

            .addCase(fetchStats.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default statsSlice.reducer;

