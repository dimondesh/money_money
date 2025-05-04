import React, { useEffect } from "react";
import css from "./StatisticsTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "@redux/categories/selectors";
import { getCategories } from "@redux/categories/operations";
import { formatNumber } from "helpers/getformatNumber";

const StatisticsTable = ({
  summary = [],
  categories = [],
  incomeSummaryByPeriod,
  expensesSummaryByPeriod,
}) => {
  const getCategoryColor = (index) => {
    const colors = [
      "#FED057",
      "#FFD8D0",
      "#FD9498",
      "#C5BAFF",
      "#6E78E8",
      "#4A56E2",
      "#81E1FF",
      "#24CCA7",
      "#00AD84",
      "#9C27B0",
    ];
    return colors[index % colors.length];
  };

  const expenseItems = summary.filter(
    (item) => item.id?.toLowerCase() === "expense"
  );

  return (
    <div className={css.wrapper}>
      <div className={css.headerRow}>
        <span>Category</span>
        <span>Sum</span>
      </div>
      <table className={css.table}>
        <tbody>
          {summary.map((item, index) => (
            <tr key={item.category} className={css.row}>
              <td className={css.dotCell}>
                <span
                  className={css.dot}
                  style={{ backgroundColor: getCategoryColor(index) }}
                />
              </td>
              <td className={css.name}>{item.category}</td>
              <td className={css.amount}>{formatNumber(item.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={css.summaryRow}>
        <span className={css.label}>Expenses:</span>
        <span className={css.value}>
          {formatNumber(expensesSummaryByPeriod)}
        </span>
      </div>
      <div className={css.summaryRow}>
        <span className={css.label}>Income:</span>
        <span className={css.income}>
          {formatNumber(incomeSummaryByPeriod)}
        </span>
      </div>
    </div>
  );
};

export default StatisticsTable;
