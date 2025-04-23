import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTransactionsCategoriesThunk,
  getTransactionsSummaryThunk,
} from "../../redux/transactions/operations";
import css from "./StatisticDatePicker.module.css";

const months = [
  "All month",
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

const StatisticDatePicker = () => {
  const dispatch = useDispatch();
  const currentMonthIndex = new Date().getMonth() + 1;
  const currentMonth = months[currentMonthIndex];
  const currentYear = `${new Date().getFullYear()}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);

  useEffect(() => {
    dispatch(getTransactionsCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    const period =
      selectedMonth === "All month"
        ? { year: selectedYear }
        : { month: selectedMonth, year: selectedYear };

    dispatch(getTransactionsSummaryThunk(period));
  }, [dispatch, selectedMonth, selectedYear]);

  useEffect(() => {
    const handleClickOutside = () => {
      setIsMonthOpen(false);
      setIsYearOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMonthDropdown = (e) => {
    e.stopPropagation();
    setIsMonthOpen(!isMonthOpen);
    setIsYearOpen(false);
  };

  const toggleYearDropdown = (e) => {
    e.stopPropagation();
    setIsYearOpen(!isYearOpen);
    setIsMonthOpen(false);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsMonthOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsYearOpen(false);
  };

  return (
    <div className={css.wrapper}>
      {/* Month */}
      <div className={`${css.dropdownWrapper} ${isMonthOpen ? css.open : ""}`}>
        <button className={css.dropdownButton} onClick={toggleMonthDropdown}>
          {selectedMonth}
        </button>
        {isMonthOpen && (
          <ul className={css.dropdownList}>
            {months.map((month) => (
              <li
                key={month}
                className={`${css.dropdownItem} ${
                  selectedMonth === month ? css.dropdownItemActive : ""
                }`}
                onClick={() => handleMonthSelect(month)}
              >
                {month}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Year  */}
      <div className={`${css.dropdownWrapper} ${isYearOpen ? css.open : ""}`}>
        <button className={css.dropdownButton} onClick={toggleYearDropdown}>
          {selectedYear}
        </button>
        {isYearOpen && (
          <ul className={css.dropdownList}>
            {years.map((year) => (
              <li
                key={year}
                className={`${css.dropdownItem} ${
                  selectedYear === year ? css.dropdownItemActive : ""
                }`}
                onClick={() => handleYearSelect(year)}
              >
                {year}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StatisticDatePicker;
