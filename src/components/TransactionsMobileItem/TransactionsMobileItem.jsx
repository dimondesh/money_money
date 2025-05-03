import { useDispatch, useSelector } from "react-redux";
import { formatData } from "../../constants/TransactionConstants";
// import icons from "../../images/icons/sprite.svg";
import styles from "./TransactionsMobileItem.module.css";
import {
  deleteTransactions,
  editTransactions,
} from "@redux/transactions/operations";
import { prettyMoneyFormat } from "../../helpers/prettyMoneyFormat";
import { motion } from "framer-motion";

// import dateFormat from "helpers/dateFormat";
import { selectCategories } from "@redux/categories/selectors";
import { FaPen } from "react-icons/fa";
import { openModalEditTransaction } from "@redux/modal/modalSlice";
import { formatDate } from "helpers/dateFormat";

const TransactionsMobileItem = ({ transaction }) => {
  const { _id, type, categoryId, comment, sum, date } = transaction;
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const category = categories.find((cat) => cat.id === categoryId);
  const categoryName = category ? category.name : "Income";

  const handleDeleteClick = () => {
    dispatch(deleteTransactions(_id));
  };

  const isIncome = type === "income";
  const textClass = isIncome ? styles.incomeText : styles.expenseText;
  const borderClass = isIncome ? styles.incomeBorder : styles.expenseBorder;

  return (
    <motion.li className={`${styles.card} ${borderClass}`}>
      <div className={styles.t_body}>
        <p className={styles.t_row}>
          <span className={styles.title}>Date:</span>
          <span className={styles.value}>{formatDate(date)}</span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Type:</span>
          <span className={styles.value}>{isIncome ? "+" : "-"}</span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Category:</span>
          <span className={styles.value}>{categoryName}</span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Comment:</span>
          <span className={styles.value}>
            {comment || <span className={styles.noComment}>—</span>}
          </span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Sum:</span>
          <span className={`${styles.value_strong} ${textClass}`}>
            {prettyMoneyFormat(sum)} UAH
          </span>
        </p>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.btn_delete}
          onClick={handleDeleteClick}
          type="button"
        >
          Delete
        </button>
        <button
          className={styles.btn_edit}
          onClick={() => {
            dispatch(openModalEditTransaction(_id));
          }}
          type="button"
        >
          <FaPen /> Edit
        </button>
      </div>
    </motion.li>
  );
};

export default TransactionsMobileItem;
