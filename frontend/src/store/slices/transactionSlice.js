import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getTransactions} from "../../api/transaction.api";
import axios from "axios";

const initialState = {
    transactions: [],
    currentAccount: null,
    loading: false,
    error: null,
};

export const fetchTransactions = createAsyncThunk(
    "transaction/fetchTransactions",
    async (_, thunkAPI) => {
        try {
            const data = await getTransactions();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch transactions"
            );
        }
    }
);

const transactionSlice = createSlice({
    name:"transactions",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchTransactions.fulfilled, (state,action) => {
                state.loading = false;
                state.transactions = action.payload.transactions;
                state.currentAccount = action.payload.currentAccount;
            })

            .addCase(fetchTransactions.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default transactionSlice.reducer;