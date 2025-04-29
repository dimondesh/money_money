import { useSelector } from "react-redux";
// import TransactionItem from "../TransactionsDescItem/TransactionsDescItem";
import TransactionsMobileItem from "../TransactionsMobileItem/TransactionsMobileItem";
import Loader from "../Loader/Loader";
import { useMedia } from "../../hooks/useMedia";

import styles from "./TransactionsList.module.css";
import {
  selectLoading,
  selectTransactions,
} from "../../redux/transactions/selectors";
import TransactionsDescItem from "../TransactionsDescItem/TransactionsDescItem";

const TransactionsList = () => {
  const transactions = useSelector(selectTransactions) || [];
  const loading = useSelector(selectLoading);
  const { isMobile } = useMedia();

  if (loading) {
    return <Loader />;
  }

  if (transactions.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        <p>You have no transactions yet.</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {transactions.map((transaction) =>
        isMobile ? (
          <TransactionsMobileItem
            key={transaction._id}
            transaction={transaction}
          />
        ) : (
          <TransactionsDescItem
            key={transaction.id}
            transaction={transaction}
          />
        )
      )}
    </ul>
  );
};

export default TransactionsList;
