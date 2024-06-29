import { configureStore } from '@reduxjs/toolkit';
import graphicsReducer from './slices/GraphicsSlice';

const store = configureStore({
  reducer: {
    graphics: graphicsReducer,
  },
});

export default store;
