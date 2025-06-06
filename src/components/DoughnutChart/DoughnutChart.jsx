import React, { useState, useRef, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import css from "./DoughnutChart.module.css";
import { formatNumber } from "helpers/getformatNumber";

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = ({
  summary,
  categories,
  expensesSummaryByPeriod,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
  const chartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

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

  // const expensesOnly = summary?.filter((item) => item.type === "expense") || [];
  const hasExpenses = summary.length > 0;

  const labels = hasExpenses
    ? summary.map((item) => {
        const category = categories.find((cat) => cat.name === item.category);
        return category ? category.name : "Невідомо";
      })
    : ["Немає даних"];

  const data = {
    labels,
    datasets: [
      {
        data: hasExpenses ? summary.map((item) => item.total) : [1],
        backgroundColor: hasExpenses
          ? summary.map((_, i) =>
              activeIndex === null
                ? colors[i]
                : i === activeIndex
                ? colors[i]
                : `${colors[i]}80`
            )
          : ["#e0e0e0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ₴${formatNumber(value.toFixed(2))}`;
          },
        },
      },
    },
    cutout: "70%",
    onHover: (event, elements) => {
      if (event?.native?.target) {
        event.native.target.style.cursor =
          elements.length > 0 ? "pointer" : "default";
      }
    },
  };

  const handleCanvasClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const points = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: true },
      true
    );

    if (points.length > 0) {
      setActiveIndex(points[0].index);
    } else {
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!chartRef.current?.canvas) return;

      if (!chartRef.current.canvas.contains(e.target)) {
        setActiveIndex(null);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const activeCategory = activeIndex !== null ? labels[activeIndex] : null;
  const activeAmount =
    activeIndex !== null ? summary[activeIndex]?.total?.toFixed(2) : null;

  return (
    <div className={css.chartWrapper}>
      <Doughnut
        ref={chartRef}
        data={data}
        options={options}
        onClick={handleCanvasClick}
      />
      <div
        className={`${css.chartCenter} ${
          activeIndex !== null ? css.fadeIn : css.fadeBack
        }`}
      >
        {hasExpenses ? (
          activeIndex !== null ? (
            <>
              <span className={css.categoryText}>{activeCategory}</span>
              <span className={css.amountText}>
                ₴ {formatNumber(activeAmount)}
              </span>
            </>
          ) : (
            <span className={css.amountText}>
              ₴ {formatNumber(expensesSummaryByPeriod.toFixed(2))}
            </span>
          )
        ) : (
          <p className={css.emptyText}>no costs</p>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
