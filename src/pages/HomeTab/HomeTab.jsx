import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { getTransactions } from "../../redux/transactions/operations.js";
import { TransactionsList } from "../../components/TransactionsList/TransactionsList.jsx";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions.jsx";
import styles from "./HomeTab.module.css";
import { getCategories } from "../../redux/categories/operations.js";

const HomeTab = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className={styles.homeTabContainer}>
      <TransactionsList />
      <ButtonAddTransactions />
    </div>
  );
};

export default HomeTab;
