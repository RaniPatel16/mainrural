import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
    addresses: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new address
export const createAddress = createAsyncThunk('addresses/create', async (addressData, thunkAPI) => {
    try {
        const response = await api.post('/addresses', addressData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user addresses
export const getAddresses = createAsyncThunk('addresses/getAll', async (_, thunkAPI) => {
    try {
        const response = await api.get('/addresses');
        return response.data.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const addressSlice = createSlice({
    name: 'addresses',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addresses.push(action.payload.data);
            })
            .addCase(createAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAddresses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAddresses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.addresses = action.payload;
            })
            .addCase(getAddresses.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = addressSlice.actions;
export default addressSlice.reducer;
