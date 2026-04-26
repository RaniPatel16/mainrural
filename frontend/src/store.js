import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import addressReducer from './features/addresses/addressSlice';
import orderReducer from './features/orders/orderSlice';
import adminReducer from './features/admin/adminSlice';
import deliveryReducer from './features/deliveries/deliverySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        addresses: addressReducer,
        orders: orderReducer,
        admin: adminReducer,
        deliveries: deliveryReducer,
    },
});
