import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/jobSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        jobs: jobReducer,
        auth: authReducer,
    },
});
