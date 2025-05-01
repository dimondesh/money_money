import { useDispatch } from "react-redux";

import { getTransactionCategory } from "../../constants/TransactionConstants";

import icons from "../../images/icons/sprite.svg";

import styles from "./TransactionsDescItem.module.css";
import {
  deleteTransactions,
  editTransactions,
} from "../../redux/transactions/operations";
import { prettyMoneyFormat } from "../../helpers/prettyMoneyFormat";
import { motion } from "framer-motion";
import { getCategories } from "@redux/categories/operations";
import dateFormat from "helpers/dateFormat";

const TransactionsDescItem = ({
  transaction,
  openDeleteModal,
  openEditModal,
}) => {
  const { id, type, categoryId, comment, sum, transactionDate } = transaction;
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    openDeleteModal();
    dispatch(deleteTransactions(id));
  };

  const handleEditClick = () => {
    openEditModal();
    dispatch(editTransactions({ id, type }));
  };

  const isIncome = type === "income";
  const textClass = isIncome ? styles.incomeText : styles.expenseText;
  const borderClass = isIncome ? styles.incomeBorder : styles.expenseBorder;

  return (
    <motion.li className={`${styles.TransactionItem} ${borderClass}`}>
      <div className={`${styles.row} ${styles.firstRow}`}>
        <span className={styles.fixData}>Date</span>
        <span className={styles.dynamicData}>
          {dateFormat(transaction.date)}
        </span>
      </div>
      <div className={`${styles.row} ${styles.secondRow}`}>
        <span className={styles.fixData}>Type</span>
        <span className={styles.dynamicData}>{isIncome ? "+" : "-"}</span>
      </div>
      <div className={`${styles.row} ${styles.thirdRow}`}>
        <span className={styles.fixData}>Category</span>
        <span className={styles.dynamicData}>{categoryId}</span>
      </div>
      <div className={`${styles.row} ${styles.forthRow}`}>
        <span className={styles.fixData}>Comment</span>
        <span className={styles.dynamicData}>{comment || "-"}</span>
      </div>
      <div className={`${styles.row} ${styles.fifthRow}`}>
        <span className={styles.fixData}>Sum</span>
        <span className={`${styles.dynamicData} ${textClass}`}>
          {prettyMoneyFormat(sum)}
        </span>
      </div>
      <div className={`${styles.row} ${styles.sixthRow}`}>
        <button
          className={styles.editButton}
          type="button"
          onClick={handleEditClick}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
          <span className={styles.editText}>Edit</span>
        </button>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </motion.li>
  );
};

export default TransactionsDescItem;
