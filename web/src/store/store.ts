import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { meowyApi } from './api';

export const store = configureStore({
  reducer: {
    [meowyApi.reducerPath]: meowyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(meowyApi.middleware),
});

// Hooks
export const useAppDispatch = () => useDispatch<typeof store.dispatch>;
export const useAppSelector: TypedUseSelectorHook<typeof store.getState> =
  useSelector;
