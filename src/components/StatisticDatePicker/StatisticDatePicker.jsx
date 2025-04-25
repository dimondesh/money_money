import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import {
//   getTransactionsCategories,
//   getExpenseSummaryByCategories,
//   getIncomeAndExpenseSummaryByPeriod,
// } from "../../redux/transactions/operations";

import css from "./StatisticDatePicker.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: new Date().getFullYear() - 2020 + 1 },
  (_, i) => `${2020 + i}`
);

const Dropdown = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (!e.target.closest(`.${css.dropdownWrapper}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${css.dropdownWrapper} ${isOpen ? css.open : ""}`}>
      <button
        className={css.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Select ${label}`}
        aria-expanded={isOpen}
        type="button"
      >
        {value}
      </button>

      {isOpen && (
        <div className={css.dropdownList} role="listbox">
          {options.map((option) => (
            <div
              key={option}
              className={`${css.dropdownItem} ${
                value === option ? css.dropdownItemActive : ""
              }`}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={value === option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatisticsDatePicker = () => {
  const dispatch = useDispatch();

  const currentDate = new Date();
  const initialMonth = months[currentDate.getMonth()];
  const initialYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  // useEffect(() => {
  //   dispatch(getTransactionsCategories());
  // }, [dispatch]);

  // useEffect(() => {
  //   const period =
  //     selectedMonth === "All month"
  //       ? { year: selectedYear }
  //       : { month: selectedMonth, year: selectedYear };

  //   dispatch(getExpenseSummaryByCategories(period));
  //   dispatch(getIncomeAndExpenseSummaryByPeriod(period));
  // }, [dispatch, selectedMonth, selectedYear]);

  return (
    <div className={css.wrapper}>
      <Dropdown
        options={months}
        value={selectedMonth}
        onChange={setSelectedMonth}
        label="month"
      />

      <Dropdown
        options={years}
        value={selectedYear}
        onChange={setSelectedYear}
        label="year"
      />
    </div>
  );
};

export default StatisticsDatePicker;
