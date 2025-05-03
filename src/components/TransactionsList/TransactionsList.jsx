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
import clsx from "clsx";
import { selectIsModalEditTransactionOpen } from "@redux/modal/selectors";
import { closeModalEditTransaction } from "@redux/modal/modalSlice";
import ModalEditTransaction from "components/ModalEditTransaction/ModalEditTransaction";

const TransactionsList = () => {
  const dispatch = useDispatch();
  const isEditModalOpen = useSelector(selectIsModalEditTransactionOpen);
  const handleCloseModal = () => dispatch(closeModalEditTransaction());

  const transactions = useSelector(selectTransactions) || [];
  const loading = useSelector(selectLoading);
  const { isMobile } = useMedia();

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
      {isMobile ? (
        <ul className={styles.list}>
          {transactions.map((transaction) => (
            <TransactionsMobileItem
              key={transaction._id}
              transaction={transaction}
            />
          ))}
        </ul>
      ) : (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr className={styles.t_row}>
              <th className={clsx(styles.title, styles.titleDate)}>Date</th>
              <th className={clsx(styles.title, styles.titleType)}>Type</th>
              <th className={clsx(styles.title, styles.titleCategory)}>
                Category
              </th>
              <th className={clsx(styles.title, styles.titleComment)}>
                Comment
              </th>
              <th className={clsx(styles.title, styles.sum)}>Sum</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {transactions.map((transaction) => (
              <TransactionsDescItem
                key={transaction._id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      )}
      {isEditModalOpen && <ModalEditTransaction onClose={handleCloseModal} />}
    </>
  );
};

export default TransactionsList;
