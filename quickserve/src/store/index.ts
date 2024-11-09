// FILE: src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import profileReducer from './profileSlice';
const store = configureStore({
  reducer: {
    form: formReducer,
    profile:profileReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;