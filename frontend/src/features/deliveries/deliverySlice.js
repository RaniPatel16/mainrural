import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
    deliveries: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
};

// Update delivery status (with FormData for photo)
export const updateDelivery = createAsyncThunk('deliveries/update', async ({ id, formData }, thunkAPI) => {
    try {
        const response = await api.put(`/deliveries/${id}/status`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

// Assign agent to order
export const assignAgent = createAsyncThunk('deliveries/assign', async ({ orderId, agentId }, thunkAPI) => {
    try {
        const response = await api.post('/deliveries/assign', { orderId, agentId });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const deliverySlice = createSlice({
    name: 'deliveries',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(assignAgent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(assignAgent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(assignAgent.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateDelivery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDelivery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // Update specific delivery in state
                const index = state.deliveries.findIndex(d => d._id === action.payload.data._id);
                if (index !== -1) {
                    state.deliveries[index] = action.payload.data;
                }
            })
            .addCase(updateDelivery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = deliverySlice.actions;
export default deliverySlice.reducer;
