import { FaPen } from "react-icons/fa";
import styles from "./TransactionsMobileItem.module.css";
import { useDispatch } from "react-redux";
import {
  deleteTransactions,
  editTransactions,
} from "../../redux/transactions/operations";
import { openModalEditTransaction } from "../../redux/modal/modalSlice";

const TransactionsMobileItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const isIncome = transaction.type === "income";

  const handleEdit = () => {
    dispatch(editTransactions(transaction));
    dispatch(openModalEditTransaction());
  };

  const handleDelete = async () => {
    await dispatch(deleteTransactions(transaction._id));
  };

  return (
    <li
      className={`${styles.card} ${isIncome ? styles.income : styles.expense}`}
    >
      <p>
        <b>Date:</b> {new Date(transaction.date).toLocaleDateString()}
      </p>
      <p>
        <b>Type:</b> {isIncome ? "Income" : "Expense"}
      </p>
      <p>
        <b>Category:</b> {transaction.category}
      </p>
      <p>
        <b>Comment:</b> {transaction.comment || "—"}
      </p>
      <p>
        <b>Amount:</b> {transaction.sum.toLocaleString()} UAH
      </p>

      <div className={styles.actions}>
        <button type="button" onClick={handleEdit} title="Edit">
          <FaPen />
        </button>
        <button type="button" onClick={handleDelete} title="Delete">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TransactionsMobileItem;
