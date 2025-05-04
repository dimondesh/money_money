import {
  deleteTransactions,
  editTransactions,
} from "@redux/transactions/operations";
import { useDispatch, useSelector } from "react-redux";

import dateFormat from "helpers/dateFormat";
import { formatData } from "../../constants/TransactionConstants";
import icons from "../../images/icons/sprite.svg";
import { motion } from "framer-motion";
import { openModalEditTransaction } from "@redux/modal/modalSlice";
import { prettyMoneyFormat } from "../../helpers/prettyMoneyFormat";
import { selectCategories } from "@redux/categories/selectors";
import styles from "./TransactionsDescItem.module.css";
import { getBalanceThunk } from "@redux/auth/operations";

// import { getCategories } from "@redux/categories/operations";

// import { openModalAddTransaction } from "@redux/modal/modalSlice";
// import { openModalEditTransactions } from "@redux/modal/modalSlice";

const TransactionsDescItem = ({ transaction }) => {
  const { _id, type, categoryId, comment, sum, date } = transaction;
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const category = categories.find((cat) => cat.id === categoryId);
  const categoryName = category ? category.name : "income";

  const handleDeleteClick = () => {
    dispatch(deleteTransactions(_id));
    dispatch(getBalanceThunk());
  };

  const handleEditClick = () => {
    dispatch(openModalEditTransaction(_id));
  };

  const isIncome = type === "income";
  const textClass = isIncome ? styles.incomeText : styles.expenseText;
  const borderClass = isIncome ? styles.incomeBorder : styles.expenseBorder;

  return (
    <motion.tr
      className={`${styles.TransactionItem} ${borderClass} ${styles.animatedRow}`}
    >
      <td className={`${styles.dynamicData} ${styles.column1}`}>
        {formatData(transaction.date)}
      </td>

      <td className={`${styles.dynamicData} ${styles.column2}`}>
        <span className={styles.typeIndicator}>{isIncome ? "+" : "-"}</span>
      </td>

      <td className={`${styles.dynamicData} ${styles.column3}`}>
        {categoryName}
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
