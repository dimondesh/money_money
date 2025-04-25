import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getBalanceThunk,
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
    balance: null,
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
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.user.name = payload.username;
        state.user.email = payload.email;
        state.user.balance = payload.balance;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false;
      })
      .addCase(getBalanceThunk.fulfilled, (state, { payload }) => {
        state.user.balance = payload;
      })
      .addMatcher(
        isAnyOf(loginThunk.fulfilled, registerThunk.fulfilled),
        (state, { payload }) => {
          state.user.name = payload.user.username;
          state.user.email = payload.user.email;
          state.user.balance = payload.user.balance;
          state.token = payload.token;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(loginThunk.pending, registerThunk.pending),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(loginThunk.rejected, registerThunk.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = payload;
        }
      );
  },
});

export const authReducer = slice.reducer;
