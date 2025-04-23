import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import css from "./DoughnutChart.module.css";

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = ({ summary, categories, balance }) => {
  const colors = [
    "#24CCA7",
    "#6E78E8",
    "#FFCF26",
    "#FED057",
    "#FFD8D0",
    "#4A56E2",
    "#81E1FF",
    "#FF6596",
    "#C5BAFF",
    "#00AD84",
  ];

  const expensesOnly = summary?.filter((item) => item.type === "EXPENSE") || [];
  const hasExpenses = expensesOnly.length > 0;
  const [activeIndex, setActiveIndex] = useState(null);

  const labels = hasExpenses
    ? expensesOnly.map((item) => {
        const category = categories.find((cat) => cat.id === item.categoryId);
        return category ? category.name : "Невідомо";
      })
    : ["No Data"];

  const data = {
    labels,
    datasets: [
      {
        data: hasExpenses ? expensesOnly.map((item) => item.EXPENSE) : [1],
        backgroundColor: hasExpenses
          ? expensesOnly.map((_, i) =>
              activeIndex === null
                ? colors[i % colors.length]
                : i === activeIndex
                ? colors[i % colors.length]
                : `${colors[i % colors.length]}80`
            )
          : ["#e0e0e0"],
        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            return `${context.label}: €${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    cutout: "70%",
    onHover: (event, elements) => {
      if (elements.length > 0) {
        setActiveIndex(elements[0].index);
      } else {
        setActiveIndex(null);
      }
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        setActiveIndex(elements[0].index);
      } else {
        setActiveIndex(null);
      }
    },
  };

  const activeCategory = activeIndex !== null ? labels[activeIndex] : null;
  const activeAmount =
    activeIndex !== null
      ? expensesOnly[activeIndex]?.EXPENSE?.toFixed(2)
      : null;

  const formatBalance = (value) => {
    return value
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div className={css.chartWrapper}>
      <Doughnut data={data} options={options} />
      <div className={css.chartCenter}>
        {hasExpenses ? (
          activeIndex !== null ? (
            <>
              <span className={css.categoryName}>{activeCategory}</span>
              <span className={css.categoryAmount}>€{activeAmount}</span>
            </>
          ) : (
            <>
              <span className={css.balanceAmount}>
                € {formatBalance(balance)}
              </span>
            </>
          )
        ) : (
          <p className={css.emptyText}>No expenses</p>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
