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

import { statisticsReducer } from "./statistics/slice";

// import currencyReducer from "./currency/currencySlice";
// import globalReducer from "./global/globalSlice";
// import financeReducer from "./finance/financeSlice";

// import categoriesReducer from "./categories/slice";
// import modalReducer from "./modal/modalSlice";
// import transactionsReducer from "./transactions/transactionsSlice";

// import currencyReducer from "./currency/currencySlice";
// import globalReducer from "./global/globalSlice";
// import financeReducer from "./finance/financeSlice";
import { transactionsReducer } from "./transactions/slice";
import { categoriesReducer } from "./categories/slice";
import { currencySlice } from "./currency/currencySlice";
import { modalReducer } from "./modal/modalSlice";

// import { modalsReducer } from "./modals/slice";

const authPersistConfig = {
  key: "auth",
  version: 1,
  whitelist: ["token"],
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    currency: currencySlice.reducer,
    // global: globalReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    statistics: statisticsReducer,
    modal: modalReducer,
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
