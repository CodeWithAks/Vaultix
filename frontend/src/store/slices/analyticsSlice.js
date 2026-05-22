import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {getMonthlyAnalytics} from "../../api/analytics.api";

export const fetchMonthlyAnalytics = createAsyncThunk(
    "analytics/fetchMonthlyAnalytics",
    async () => {
        try{
            const response = await getMonthlyAnalytics();
            return response;
        } catch (error) {
            throw new Error("Failed to fetch monthly analytics");
        }
    }
);

const analyticsSlice = createSlice({
    name:"analytics",
    initialState:{
        data:[],
        loading:false,
        error:null
    },
    reducers:{},

    extraReducers:(builder) => {
        builder
            .addCase(fetchMonthlyAnalytics.pending, (state) => { 
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchMonthlyAnalytics.fulfilled, (state,action) => { 
                state.loading = false;
                state.data = action.payload; 
            })

            .addCase(fetchMonthlyAnalytics.rejected, (state,action) => {
                state.loading = false;
                state.error = action.error.message; 
                })
    },
});

export default analyticsSlice.reducer;