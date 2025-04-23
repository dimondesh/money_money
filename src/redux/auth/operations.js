import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, setToken } from "../../helpers/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const res = await api.post("/auth/sign-in", credentials);
      setToken(res.data.token);
      const { username } = res.data.user;
      toast.success(`Welcome back, ${username}!`, {
        position: "top-right",
        autoClose: 5000,
      });
      return res.data;
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          toast.error("Please fill in all fields correctly.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else if (status === 403) {
          toast.error("Wrong password. Try again.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else if (status === 404) {
          toast.error("User with such email not found. Please register!", {
            position: "top-right",
            autoClose: 5000,
          });
        }
        return thunkApi.rejectWithValue(
          error.response.data.message || "Login failed. Please try again."
        );
      }
    }
  }
);
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const res = await api.post("/auth/sign-up", credentials);
      setToken(res.data.token);
      const { username } = res.data.user;

      toast.success(`Welcome, ${username}! Registration successful 🎉`, {
        position: "top-right",
        autoClose: 5000,
      });

      return res.data;
    } catch (error) {
      if (error.response) {
        const { status } = error.response;

        if (status === 400) {
          toast.error("Please fill in all fields correctly.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else if (status === 409) {
          toast.error("A user with this email already exists.", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast.error("Something went wrong. Please try again.", {
            position: "top-right",
            autoClose: 5000,
          });
        }

        return thunkApi.rejectWithValue(
          error.response.data.message || "Registration failed. Try again."
        );
      }

      toast.error("Network error. Please check your connection.");
      return thunkApi.rejectWithValue("Network error");
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const { data } = await api.delete("/api/auth/sign-out");
      removeToken();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (savedToken) {
      setToken(savedToken);
    } else {
      return thunkApi.rejectWithValue("Token doesn't exist");
    }

    try {
      const { data } = await api.get("/api/users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getBalanceThunk = createAsyncThunk(
  "getBalance",
  async (_, thunkApi) => {
    try {
      const { data } = await api.get("/api/users/current");
      return data.balance;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
