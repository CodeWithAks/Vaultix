import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "../../api/auth.api";
import { data } from "react-router-dom";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};


export const login = createAsyncThunk(
    "auth/login",

    async (data, thunkAPI) => {
        try {
            return await loginUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.message
            );
        }
    }
)

export const register = createAsyncThunk(
    "auth/register",

    async (data, thunkAPI) => {
        try {
            return await registerUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.message
            );
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",

    async (_, thunkAPI) => {
        try {
            return await logoutUser();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.message
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })

      .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Register
        .addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        })

        // Logout
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
            state.isAuthenticated = false;
        });
},
});

export default authSlice.reducer;