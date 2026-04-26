import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
    users: [],
    agents: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Get all users (Admin only)
// Note: We need to implement a backend route for this if it doesn't exist, 
// for now let's assume we can fetch users.
export const getAllUsers = createAsyncThunk('admin/getUsers', async (_, thunkAPI) => {
    try {
        const response = await api.get('/auth/users'); // Hypothetical, let's assume it exists or I'll add it
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.agents = action.payload.filter(u => u.role === 'agent');
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
