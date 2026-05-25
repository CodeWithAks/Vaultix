import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    cards: [],
    loading: false,
    error: null,
};

export const fetchCards = createAsyncThunk(
    "cards/fetchCards",
    async (__, thunkAPI) => {
        try {
            const response = await axios.get("/api/cards");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch cards"
            );
        }
    }
)


const cardSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // loading
            .addCase(fetchCards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            // success
            .addCase(fetchCards.fulfilled, (state, action) => {
                state.loading = false;
                state.cards = action.payload;
            })

            // error
            .addCase(fetchCards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default cardSlice.reducer;