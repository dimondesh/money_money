import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
} from "@redux/statistics/selectors";

import css from "./StatisticsTab.module.css";
import { getIncomeAndExpenseSummaryByPeriod } from "@redux/statistics/operations";
import { selectCategories } from "@redux/categories/selectors";
import { getCategories } from "@redux/categories/operations";

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const summary = useSelector(selectSummary);
  const isLoading = useSelector(selectStatisticsLoading);
  const error = useSelector(selectStatisticsError);
  const incomeSummaryByPeriod = useSelector(selectIncomeSummaryByPeriod);
  const expensesSummaryByPeriod = useSelector(selectExpenseSummaryByPeriod);

  const categories = useSelector(selectCategories) || [];
  const currentDate = new Date();
  const initialMonth = currentDate.getMonth() + 1;
  const initialYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getIncomeAndExpenseSummaryByPeriod({
        year: selectedYear,
        month: selectedMonth,
      })
    );
  }, [dispatch, selectedYear, selectedMonth]);

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
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
      </div>

      <div className={css.statisticsData}>
        <div className={css.statisticDatePicker}>
          <StatisticDatePicker
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
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
