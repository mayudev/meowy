import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {},
});

// Hooks
export const useAppDispatch = () => useDispatch<typeof store.dispatch>;
export const useAppSelector: TypedUseSelectorHook<typeof store.getState> =
  useSelector;
