// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userData';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
