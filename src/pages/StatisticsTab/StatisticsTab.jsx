import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import StatisticDatePicker from "../../components/StatisticDatePicker/StatisticDatePicker";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
import Section from "../../components/Section/Section";
import Loader from "../../components/Loader/Loader";
import { getTransactionsCategoriesThunk } from "../../redux/transactions/operations";
import {
  selectTransactionsSummary,
  selectTransactionsCategories,
  selectTransactionsLoading,
  selectTransactionsError,
} from "../../redux/transactions/selectors";
import css from "./StatisticsTab.module.css";

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const summary = useSelector(selectTransactionsSummary);
  const categories = useSelector(selectTransactionsCategories);
  const isLoading = useSelector(selectTransactionsLoading);
  const error = useSelector(selectTransactionsError);

  useEffect(() => {
    dispatch(getTransactionsCategoriesThunk());
  }, [dispatch]);

  const calculateExpenses = () => {
    return summary
      .filter((item) => item.type === "EXPENSE")
      .reduce((acc, item) => acc + item.EXPENSE, 0);
  };

  const calculateIncome = () => {
    return summary
      .filter((item) => item.type === "INCOME")
      .reduce((acc, item) => acc + (item.INCOME || 0), 0);
  };

  const expenses = calculateExpenses();
  const income = calculateIncome();
  const balance = income - expenses;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className={css.error}>Error loading statistics: {error}</div>;
  }

  const hasExpenses = summary.some((item) => item.type === "EXPENSE");

  return (
    <Section title="Statistics">
      <div className={css.statistics}>
        <div className={css.chartContainer}>
          <div className={css.chart}>
            <DoughnutChart
              summary={summary}
              categories={categories}
              balance={balance}
            />
          </div>
        </div>

        <div className={css.statisticsData}>
          <div className={css.statisticsDashboard}>
            <StatisticDatePicker />
          </div>

          <div className={css.statisticsTable}>
            {hasExpenses ? (
              <StatisticsTable
                summary={summary}
                categories={categories}
                income={income}
                expenses={expenses}
              />
            ) : (
              <div className={css.noData}>
                No expense data available for the selected period
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default StatisticsTab;
