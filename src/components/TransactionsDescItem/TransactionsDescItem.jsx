
import { useDispatch } from "react-redux";

import {
  formatData,
  getTransactionCategory,
} from "../../constants/TransactionConstants";

import icons from "../../images/icons/sprite.svg";

import styles from "./TransactionsDescItem.module.css";
import {
  deleteTransactions,
  editTransactions,
} from "../../redux/transactions/operations";
import { prettyMoneyFormat } from '../../helpers/prettyMoneyFormat';
import { motion } from 'framer-motion';

const TransactionsDescItem = ({
  transaction,
  openDeleteModal,
  openEditModal,
}) => {
  const { id, type, category, comment, sum, transactionDate } = transaction;
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    openDeleteModal();
    dispatch(deleteTransactions(id));
  };

  const handleEditClick = () => {
    openEditModal();
    dispatch(editTransactions({ id, type }));
  };

  const isIncome = type === "INCOME";
  const textClass = isIncome ? styles.incomeText : styles.expenseText;
  const borderClass = isIncome ? styles.incomeBorder : styles.expenseBorder;

  return (
    
    <motion.li
      className = {`${styles.TransactionItem} ${borderClass}`
}>
      <div className={`${styles.row} ${styles.firstRow}`}>
        <span className={styles.fixData}>Date</span>
        <span className={styles.dynamicData}>
          {formatData(transactionDate)}
        </span>
      </div>
      <div className={`${styles.row} ${styles.secondRow}`}>
        <span className={styles.fixData}>Type</span>
        <span className={styles.dynamicData}>{isIncome ? "+" : "-"}</span>
      </div>
      <div className={`${styles.row} ${styles.thirdRow}`}>
        <span className={styles.fixData}>Category</span>
        <span className={styles.dynamicData}>
          {getTransactionCategory(category)}
        </span>
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
