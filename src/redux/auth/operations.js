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

// Тимчасова заглушка, поки не реалізована логіка refreshUserThunk
export const refreshUserThunk = () => async () => {};
