import React from "react";
// import { useSelector } from "react-redux";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import StatisticDatePicker from "../../components/StatisticDatePicker/StatisticDatePicker";
import StatisticsTable from "../../components/StatisticsTable/StatisticsTable";
// import Section from "../../components/Section/Section";
import Loader from "../../components/Loader/Loader";
// import {
//   selectTransactionsSummary,
//   selectTransactionsCategories,
//   selectTransactionsLoading,
//   selectTransactionsError,
// } from "../../redux/transactions/selectors";
import css from "./StatisticsTab.module.css";

// Мокові дані
const categories = [
  { id: "10", name: "Main expenses" },
  { id: "11", name: "Products" },
  { id: "12", name: "Car" },
  { id: "13", name: "Self care" },
  { id: "14", name: "Child care" },
  { id: "15", name: "Household products" },
  { id: "16", name: "Education" },
  { id: "17", name: "Leisure" },
  { id: "18", name: "Other expenses" },
];

const summary = [
  { categoryId: "10", type: "EXPENSE", EXPENSE: 4200.0 },
  { categoryId: "11", type: "EXPENSE", EXPENSE: 2350.45 },
  { categoryId: "12", type: "EXPENSE", EXPENSE: 1980.0 },
  { categoryId: "13", type: "EXPENSE", EXPENSE: 750.0 },
  { categoryId: "14", type: "EXPENSE", EXPENSE: 1440.0 },
  { categoryId: "15", type: "EXPENSE", EXPENSE: 980.0 },
  { categoryId: "16", type: "EXPENSE", EXPENSE: 310.0 },
  { categoryId: "17", type: "EXPENSE", EXPENSE: 2800.0 },
  { categoryId: "18", type: "EXPENSE", EXPENSE: 600.0 },
  { categoryId: "20", type: "INCOME", INCOME: 18000.0 },
  { categoryId: "20", type: "INCOME", INCOME: 1200.0 },
];

// const categories = useSelector(selectTransactionsCategories);
// const summary = useSelector(selectTransactionsSummary);
// const isLoading = useSelector(selectTransactionsLoading);
// const error = useSelector(selectTransactionsError);

const getTotalByType = (summary, type, key) =>
  summary
    .filter((item) => item.type === type)
    .reduce((total, item) => total + item[key], 0);

const StatisticsTab = () => {
  const incomeSummaryByPeriod = getTotalByType(summary, "INCOME", "INCOME");
  const expensesSummaryByPeriod = getTotalByType(summary, "EXPENSE", "EXPENSE");

  // if (isLoading) return <Loader />;
  // if (error) return <div className={css.statistics}><p className={css.error}>{error}</p></div>;

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
