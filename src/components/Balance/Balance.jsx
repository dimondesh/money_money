import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Balance.module.css';

const Balance = () => {
  const totalBalance = useSelector(state => state.finance.totalBalance);

  return (
    <div className={styles.balanceContainer}>
      <h2 className={styles.title}>Your Balance</h2>
      <p className={styles.amount}>{totalBalance.toFixed(2)} UAH</p>
    </div>
  );
};

export default Balance;
