export const selectSummary = (state) => state.statistics.summary;
export const selectStatisticsLoading = (state) =>
  state.statistics.isStatisticsLoading;
export const selectStatisticsError = (state) =>
  state.statistics.isStatisticsError;
export const selectIncomeSummaryByPeriod = (state) =>
  state.statistics.incomeSummaryByPeriod;
export const selectExpenseSummaryByPeriod = (state) =>
  state.statistics.expenseSummaryByPeriod;
export const selectStatisticsMonth = (state) => state.statistics.month;
export const selectStatisticsYear = (state) => state.statistics.year;
