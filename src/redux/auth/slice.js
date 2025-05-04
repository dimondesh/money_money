// Файл: src/redux/auth/slice.js

import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getBalanceThunk,
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
} from "./operations.js";
import {
  addTransactions,
  deleteTransactions,
  editTransactions,
} from "@redux/transactions/operations.js";

const initialState = {
  user: {
    username: null,
    email: null,
    balance: null,
  },
  reducers: {
    clearAuthData() {
      return initialState;
    },
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      // --- УСПЕШНЫЙ ЛОГИН ---
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.user.username = payload.user?.username; // Используем state.user.username
        state.user.email = payload.user?.email;
        state.user.balance = payload.user?.balance;
        state.token = payload.accessToken; // Устанавливаем токен
        state.isLoggedIn = true; // Пользователь вошел
        state.isLoading = false;
        state.isError = null;
      })
      // --- УСПЕШНАЯ РЕГИСТРАЦИЯ ---
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user.username = payload.username;
        state.user.email = payload.email;
        state.user.balance = payload.balance;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.user.username = payload.username;
        state.user.email = payload.email;
        state.user.balance = payload.balance;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      // --- ОСТАЛЬНЫЕ ОБРАБОТЧИКИ ---
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(refreshUserThunk.pending, (state) => {
        state.isRefreshing = true;
        state.isLoading = true;
      })
      .addCase(refreshUserThunk.rejected, (state) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(getBalanceThunk.fulfilled, (state, { payload }) => {
        state.user.balance = payload;
      })

      .addMatcher(
        isAnyOf(
          loginThunk.pending,
          registerThunk.pending /* refreshUserThunk.pending обработан */
        ),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected /* refreshUserThunk.rejected обработан */
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = payload;
        }
      );
  },
});

export const { clearAuthData } = slice.actions;

export const authReducer = slice.reducer;
