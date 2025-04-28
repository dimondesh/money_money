export const selectSummary = (state) => state.summary;

export const selectStatisticsLoading = (state) =>
  state.statistics.isStatisticsLoading;
export const selectStatisticsError = (state) =>
  state.statistics.isStatisticsError;

export const selectIncomeSummaryByPeriod = (state) => state.statistics.income;
export const selectExpenseSummaryByPeriod = (state) => state.statistics.expense;
