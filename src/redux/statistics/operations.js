import { walletAPI } from "helpers/api";

export const getIncomeAndExpenseSummaryByPeriod = createAsyncThunk(
  "transactions/summaryByPeriod",
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
        income,
        totalExpenses,
        expenses,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        return {
          income: 0,
          totalExpenses: 0,
          expenses: 0,
        };
      }
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch summary by period"
      );
    }
  }
);
