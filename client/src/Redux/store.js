import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/user.slice/user.slice';

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
