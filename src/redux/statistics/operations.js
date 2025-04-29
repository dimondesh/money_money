import { createAsyncThunk } from "@reduxjs/toolkit";
import { walletAPI, setToken } from "helpers/api";

export const getIncomeAndExpenseSummaryByPeriod = createAsyncThunk(
  "statistics/getIncomeAndExpenseSummaryByPeriod",
  async ({ month, year }, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
      return thunkApi.rejectWithValue("No token");
    }

    setToken(savedToken);

    try {
      let query = `api/statistics?year=${year}`;
      if (typeof month === "number") {
        query += `&month=${month}`;
      }

      const { data } = await walletAPI.get(query);
      const { income, totalExpenses, expenses } = data.data;

      return {
        incomeSummaryByPeriod: income,
        expenseSummaryByPeriod: totalExpenses,
        summary: expenses || [],
      };
    } catch (error) {
      if (error.response?.status === 404) {
        return {
          incomeSummaryByPeriod: 0,
          expenseSummaryByPeriod: 0,
          summary: [],
        };
      }
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch summary by period"
      );
    }
  }
);
