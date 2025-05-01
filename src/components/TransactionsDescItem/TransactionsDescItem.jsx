import { useDispatch } from "react-redux";

import { getTransactionCategory } from "../../constants/TransactionConstants";

import icons from "../../images/icons/sprite.svg";

import styles from "./TransactionsDescItem.module.css";
import {
  deleteTransactions,
  editTransactions,
} from "@redux/transactions/operations";
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
     <motion.tr 
      className={`${styles.TransactionItem} ${borderClass} ${styles.animatedRow}`}
    >
      
      <td className={`${styles.dynamicData} ${styles.column1}`}>
        {dateFormat(transaction.date)}
      </td>

     
      <td className={`${styles.dynamicData} ${styles.column2}`}>
        <span className={styles.typeIndicator}>
          {isIncome ? "+" : "-"}
        </span>
      </td>

      
      <td className={`${styles.dynamicData} ${styles.column3}`}>
        {categoryId}
      </td>

     
      <td className={`${styles.dynamicData} ${styles.column4}`}>
        <div className={styles.commentWrapper}>
          {comment || <span className={styles.noComment}>—</span>}
        </div>
      </td>

     
      <td className={`${styles.dynamicData} ${styles.column5} ${textClass}`}>
        {prettyMoneyFormat(sum)}
      </td>

      
      <td className={`${styles.sixthRow} ${styles.column6}`}>
        <div className={styles.buttonGroup}>
          <button
            className={styles.editButton}
            type="button"
            onClick={handleEditClick}
            aria-label="Edit"
          >
            <svg className={styles.editIcon}>
              <use href={`${icons}#icon-edit`}></use>
            </svg>
         
          </button>
          
          <button
            type="button"
            className={styles.deleteButton}
            onClick={handleDeleteClick}
            aria-label="Delete"
          >
            Delete
          </button>
        </div>
      </td>
    </motion.tr>
  );
  
};

export default TransactionsDescItem;
