import { useDispatch } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';
import { deleteTransaction } from '../../redux/transactions/transactionOps';
import { openModalEditTransaction, setTransactionToEdit } from '../../redux/modal/modalSlice';

import styles from './TransactionsMobileItem.module.css';

const TransactionsMobileItem = ({ transaction }) => {
  const dispatch = useDispatch();
  const isIncome = transaction.amount > 0;

  const handleEdit = () => {
    dispatch(setTransactionToEdit(transaction));
    dispatch(openModalEditTransaction());
  };

  const handleDelete = async () => {
    await dispatch(deleteTransaction(transaction.id));
  };

  return (
    <li className={`${styles.card} ${isIncome ? styles.income : styles.expense}`}>
      <p><b>Date:</b> {transaction.date}</p>
      <p><b>Type:</b> {isIncome ? 'Income' : 'Expense'}</p>
      <p><b>Category:</b> {transaction.categoryName}</p>
      <p><b>Comment:</b> {transaction.comment}</p>
      <p><b>Amount:</b> {Math.abs(transaction.amount)} UAH</p>

      <div className={styles.actions}>
        <button type="button" onClick={handleEdit}>
          <FaPen />
        </button>
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TransactionsMobileItem;