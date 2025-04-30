import { useDispatch, useSelector } from "react-redux";

import TransactionsMobileItem from "../TransactionsMobileItem/TransactionsMobileItem";
import Loader from "../Loader/Loader";
import { useMedia } from "../../hooks/useMedia";
import styles from "./TransactionsList.module.css";
import {
  selectLoading,
  selectTransactions,
} from "../../redux/transactions/selectors";
import TransactionsDescItem from "../TransactionsDescItem/TransactionsDescItem";
import { getTransactions } from "../../redux/transactions/operations";
import { useEffect } from "react";
import clsx from 'clsx'; 

const TransactionsList = () => {
  const dispatch = useDispatch();

  const transactions = useSelector(selectTransactions) || [];
  const loading = useSelector(selectLoading);
  const { isTablet } = useMedia(); 

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (transactions.length === 0) {
    return (
      <div className={styles.empty}> 
        <p>You have no transactions yet.</p>
      </div>
    );
  }

  return (
    <>
      {isTablet ? (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.t_row}>
              <th className={styles.title}>Date</th>
              <th className={styles.title}>Type</th>
              <th className={styles.title}>Category</th>
              <th className={styles.title}>Comment</th>
              <th className={clsx(styles.title, styles.sum)}>Sum</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {transactions.map(transaction => (
              <TransactionsDescItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <ul className={styles.list}>
          {transactions.map(transaction => (
            <TransactionsMobileItem
              key={transaction._id}
              transaction={transaction}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default TransactionsList;
