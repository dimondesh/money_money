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
import currencyReducer from './currency/currencySlice';
import globalReducer from './global/globalSlice';
import financeReducer from './finance/financeSlice';


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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['auth.reducers.clearAuthData'], // Додано ігнорування
      },
    }),
});

export const persistor = persistStore(store);