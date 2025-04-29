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
<<<<<<< HEAD
// import currencyReducer from "./currency/currencySlice";
// import globalReducer from "./global/globalSlice";
// import financeReducer from "./finance/financeSlice";

// import categoriesReducer from "./categories/slice";
// import modalReducer from "./modal/modalSlice";
// import transactionsReducer from "./transactions/transactionsSlice";
=======

import currencyReducer from "./currency/currencySlice";
import globalReducer from "./global/globalSlice";
// import financeReducer from "./finance/financeSlice";
import { transactionsReducer } from "./transactions/slice";
import { categoriesReducer } from "./categories/slice";

import { modalsReducer } from './modals/slice'; 
>>>>>>> main

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
<<<<<<< HEAD
    // finance: financeReducer,
    // transactions: transactionsReducer,
    // modal: modalReducer,
    // categories: categoriesReducer,
=======
    transactions: transactionsReducer,
    categories: categoriesReducer,
    // finance: financeReducer,

  
    modals: modalsReducer, 

>>>>>>> main
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
<<<<<<< HEAD
        ignoredPaths: ["auth.reducers.clearAuthData"], // Додано ігнорування
=======

        ignoredPaths: ["auth.reducers.clearAuthData"], // Додано ігнорування


>>>>>>> main
      },
    }),
});

export const persistor = persistStore(store);
