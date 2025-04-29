import React from "react";
import { useSelector } from "react-redux";

import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import StatisticDatePicker from "../../components/StatisticDatePicker/StatisticDatePicker";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import Loader from "../../components/Loader/Loader";

import {
  selectSummary,
  selectStatisticsLoading,
  selectStatisticsError,
  selectIncomeSummaryByPeriod,
  selectExpenseSummaryByPeriod,
} from "../../redux/statistics/selectors";

import css from "./StatisticsTab.module.css";
import { selectCategories } from "../../redux/categories/selectors";

const StatisticsTab = () => {
  const summary = useSelector(selectSummary);
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectStatisticsLoading);
  const error = useSelector(selectStatisticsError);
  const incomeSummaryByPeriod = useSelector(selectIncomeSummaryByPeriod);
  const expensesSummaryByPeriod = useSelector(selectExpenseSummaryByPeriod);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <div className={css.statistics}>
        <p className={css.error}>{error}</p>
      </div>
    );

  return (
    <div className={css.statistics}>
      <div>
        <h2 className={css.statisticsTitle}>Statistics</h2>
        <div className={css.doughnutChart}>
          <DoughnutChart
            summary={summary}
            categories={categories}
            expensesSummaryByPeriod={expensesSummaryByPeriod}
          />
        </div>
      </div>

      <div className={css.statisticsData}>
        <div className={css.statisticDatePicker}>
          <StatisticDatePicker />
        </div>

        <StatisticsTable
          summary={summary}
          categories={categories}
          incomeSummaryByPeriod={incomeSummaryByPeriod}
          expensesSummaryByPeriod={expensesSummaryByPeriod}
        />
      </div>
    </div>
  );
};

export default StatisticsTab;
