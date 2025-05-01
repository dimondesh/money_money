import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getIncomeAndExpenseSummaryByPeriod } from "./operations";

const initialState = {
  summary: [],
  isStatisticsLoading: false,
  isStatisticsError: null,
  incomeSummaryByPeriod: 0,
  expenseSummaryByPeriod: 0,
};

const slice = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(
        getIncomeAndExpenseSummaryByPeriod.fulfilled,
        (state, { payload }) => {
          state.isStatisticsLoading = false;
          state.incomeSummaryByPeriod = payload;
          state.expenseSummaryByPeriod = payload;
          state.summary = payload; // 👈 ОБОВ'ЯЗКОВО ДОДАЙ!
        }
      )
      .addMatcher(
        isAnyOf(getIncomeAndExpenseSummaryByPeriod.rejected),
        (state, { payload }) => {
          state.isStatisticsLoading = false;
          state.isStatisticsError = true;
        }
      )
      .addMatcher(
        isAnyOf(getIncomeAndExpenseSummaryByPeriod.pending),
        (state) => {
          state.isStatisticsLoading = true;
          state.isStatisticsError = false;
        }
      );
  },
});

export const statisticsReducer = slice.reducer;
