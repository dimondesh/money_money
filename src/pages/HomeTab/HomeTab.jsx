import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { getTransactions, getTransactionsCategories } from '../../redux/transactions/operations.js';
import { TransactionsList } from '../../components/TransactionsList/TransactionsList.jsx';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions.jsx';
import styles from './HomeTab.module.css';


const HomeTab = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions());
    // dispatch(getTransactionsCategories());
  }, [dispatch]);

  return (
    <div className={styles.homeTabContainer}>
      <TransactionsList />
      <ButtonAddTransactions />
    </div>
  );
};

export default HomeTab;