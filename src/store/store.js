import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createTransform } from "redux-persist";
import authReducer from "./authSlice";
import itemsReducer from "./itemsSlice";
import uiReduces from "./uiSlice";

const itemsTransform = createTransform(
  (inboundState, key) => {
    if (key === "items") {
      return {
        recipes: inboundState.recipes,
        recipeDetailsCache: inboundState.recipeDetailsCache,
        lastFetched: inboundState.lastFetched,
      };
    }
    return inboundState;
  },
  (outboundState, key) => {
    if (key === "items") {
      return {
        ...outboundState,
        status: "idle",
        error: null,
        currentRecipeStatus: "idle",
        prefetchingIds: [],
      };
    }
    return outboundState;
  },
  { whitelist: ["items"] },
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["items"],
  transforms: [itemsTransform],
};

const rootReducer = combineReducers({
  auth: authReducer,
  items: itemsReducer,
  ui: uiReduces,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
