import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers"; // Đảm bảo đường dẫn chính xác

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== "production", // Bật Redux DevTools ở chế độ dev
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
