import React, { useEffect, useState } from "react";
import css from "./StatisticDatePicker.module.css";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const years = Array.from(
  { length: new Date().getFullYear() - 2020 + 1 },
  (_, i) => {
    const year = 2020 + i;
    return { label: year.toString(), value: year };
  }
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

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`${css.dropdownWrapper} ${isOpen ? css.open : ""}`}>
      <button
        className={css.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Select ${label}`}
        aria-expanded={isOpen}
        type="button"
      >
        {selectedOption ? selectedOption.label : "Select"}
      </button>

      {isOpen && (
        <div className={css.dropdownList} role="listbox">
          {options.map((option) => (
            <div
              key={option.value}
              className={`${css.dropdownItem} ${
                value === option.value ? css.dropdownItemActive : ""
              }`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatisticDatePicker = ({
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
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

export default StatisticDatePicker;
