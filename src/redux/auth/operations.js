import { createAsyncThunk } from "@reduxjs/toolkit";
// Убедитесь, что путь и расширение .js верны
import { walletAPI, setToken, clearToken } from "../../helpers/api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      // Используем walletAPI
      const res = await walletAPI.post("/api/auth/login", credentials);
      setToken(res.data.data.accessToken);
      return res.data.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const res = await walletAPI.post("/api/auth/register", credentials);
      const registeredUser = res.data.data;

      if (!registeredUser || !registeredUser.username) {
        console.error(
          "Registration response from backend is missing user data:",
          res.data
        );
        throw new Error("Registration response missing user data.");
      }

      const { username } = registeredUser;

      toast.success(
        `Welcome, ${username}! Registration successful. Please log in.`
      );

      return registeredUser;
    } catch (error) {
      let message = "Registration failed";
      if (error.response?.status === 409) {
        message = error.response.data?.message || "Email already in use.";
      } else if (error.response?.status === 400) {
        message =
          error.response.data?.message || "Bad Request. Check input data.";
      } else {
        message =
          error.response?.data?.message ||
          error.message ||
          "Registration failed";
      }
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      // Используем walletAPI и метод POST
      await walletAPI.post("/api/auth/logout");
      clearToken();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Logout failed";
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;

    if (!token) {
      return rejectWithValue("Token doesn't exist");
    }

    setToken(token);

    try {
      const { data } = await walletAPI.get("/api/users/current");
      return data.data || data; // залежить від структури відповіді бекенду
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Refresh failed";
      toast.error(message);
      clearToken();
      return rejectWithValue(message);
    }
  }
);

export const getBalanceThunk = createAsyncThunk(
  "getBalance",
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
      return thunkApi.rejectWithValue("Not authenticated");
    }
    setToken(savedToken);
    try {
      // Используем walletAPI
      const { data } = await walletAPI.get("/api/users/current");
      return data.data.balance;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to get balance";
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);
