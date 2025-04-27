import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Balance.module.css';

const Balance = () => {
  const totalBalance = useSelector(state => state.finance?.totalBalance ?? state.auth?.user?.balance ?? 0);

  return (
    <div className={styles.balanceWrapper}>
      <p className={styles.balanceText}>Your balance</p>
      <p className={styles.balanceAmount}>₴ {typeof totalBalance === 'number' ? totalBalance.toFixed(2) : '0.00'}</p>
    </div>
  );
};

export default Balance;