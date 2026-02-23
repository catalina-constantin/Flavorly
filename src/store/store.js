import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import itemsReducer from "./itemsSlice";
import uiReduces from "./uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    ui: uiReduces,
  },
});
