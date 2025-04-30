import { FaPen } from "react-icons/fa";
import styles from "./TransactionsMobileItem.module.css";
import { useDispatch } from "react-redux";
import {
  deleteTransactions,
  editTransactions,
} from "../../redux/transactions/operations";
import { openModalEditTransaction } from "../../redux/modal/modalSlice";
import { motion } from "framer-motion";
import { prettyMoneyFormat } from "../../helpers/prettyMoneyFormat";


const TransactionsMobileItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const isIncome = transaction.type === "income";

  // const borderStyle = isIncome ? styles.table_plus : styles.table_minus;


  const handleEdit = () => {
    dispatch(editTransactions(transaction));
    dispatch(openModalEditTransaction());
  };

  const handleDelete = async () => {
    await dispatch(deleteTransactions(transaction._id));
  };

  return (
     <motion.li
      className={`${styles.card} ${isIncome ? styles.income : styles.expense}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ delay: 0.3 * index }}
    >
      
      <div className={styles.t_body}>
        <p className={styles.t_row}>
          <span className={styles.title}>Date:</span>
          <span className={styles.value}>
            {new Date(transaction.date).toLocaleDateString()}
          </span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Type:</span>
          <span className={styles.value}>{isIncome ? "+" : "-"}</span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Category:</span>
          <span className={styles.value}>{transaction.category}</span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Comment:</span>
          <span className={styles.value}>{transaction.comment || "—"}</span>
        </p>

        <p className={styles.t_row}>
          <span className={styles.title}>Amount:</span>
          <span className={`${styles.value_strong} ${isIncome ? styles.plus : styles.minus}`}>
            {prettyMoneyFormat(transaction.sum)} UAH
          </span>
        </p>
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.btn_delete} 
          onClick={handleDelete}
          type="button"
        >
          Delete
        </button>
        <button
          className={styles.btn_edit}
          onClick={handleEdit}
          type="button"
        >
          <FaPen /> Edit
        </button>
      </div>
    </motion.li>
  );
};

export default TransactionsMobileItem;
