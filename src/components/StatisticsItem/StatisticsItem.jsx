import React from "react";
import css from "./StatisticsItem.module.css";

const StatisticsItem = ({ category, color, amount }) => {
  const formatNumber = (number) => {
    return number
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className={css.itemWrapper}>
      <div className={css.categoryInfo}>
        <span
          className={css.colorDot}
          style={{ backgroundColor: color }}
        ></span>
        <span className={css.categoryName}>{category}</span>
      </div>
      <span className={css.amount}>{formatNumber(amount)}</span>
    </div>
  );
};

export default StatisticsItem;
