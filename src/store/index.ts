import { configureStore } from '@reduxjs/toolkit';
import tokensReducer from './slices/tokensSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
