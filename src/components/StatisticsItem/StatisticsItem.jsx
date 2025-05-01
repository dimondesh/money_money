import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { Months_OPTIONS } from "../../constants/TransactionConstants";
import css from "./StatisticsItem.module.css";

const StatisticsItem = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className={css.wrapper}>
      <Listbox value={selectedMonth} onChange={onMonthChange}>
        {({ open }) => (
          <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
            <ListboxButton className={css.dropdownButton}>
              {selectedMonth}
            </ListboxButton>
            <ListboxOptions className={css.dropdownList}>
              {Months_OPTIONS.value.map((month) => (
                <ListboxOption key={month} value={month} as="li">
                  {({ selected }) => (
                    <div
                      className={`${css.dropdownItem} ${
                        selected ? css.dropdownItemActive : ""
                      }`}
                    >
                      {month}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>

      <Listbox value={selectedYear} onChange={onYearChange}>
        {({ open }) => (
          <div className={`${css.dropdownWrapper} ${open ? css.open : ""}`}>
            <ListboxButton className={css.dropdownButton}>
              {selectedYear}
            </ListboxButton>
            <ListboxOptions className={css.dropdownList}>
              {Months_OPTIONS.label.map((year) => (
                <ListboxOption key={year} value={year} as="li">
                  {({ selected }) => (
                    <div
                      className={`${css.dropdownItem} ${
                        selected ? css.dropdownItemActive : ""
                      }`}
                    >
                      {year}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default StatisticsItem;
