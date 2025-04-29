import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import currencyReducer from "./currency/currencySlice";
import globalReducer from "./global/globalSlice";
import financeReducer from "./finance/financeSlice";

import categoriesReducer from "./categories/slice";
import modalReducer from "./modal/modalSlice";
import transactionsReducer from "./transactions/transactionsSlice";

const authPersistConfig = {
  key: "auth",
  version: 1,
  whitelist: ["token"],
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    currency: currencyReducer,
    global: globalReducer,
    finance: financeReducer,
    transactions: transactionsReducer,
    modal: modalReducer,
    categories: categoriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["auth.reducers.clearAuthData"], // Додано ігнорування
      },
    }),
});

export const persistor = persistStore(store);
