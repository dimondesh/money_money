import axios from "axios";

export const walletAPI = axios.create({
  baseURL: "https://money-money-backend-k4hn.onrender.com",
  withCredentials: true,
});

export const setToken = (token) => {
  if (token) {
    walletAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete walletAPI.defaults.headers.common.Authorization;
  }
};

export const clearToken = () => {
  delete walletAPI.defaults.headers.common.Authorization;
};
