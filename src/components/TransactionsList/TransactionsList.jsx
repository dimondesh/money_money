
// import { useSelector } from 'react-redux';
// import TransactionItem from '../TransactionsDescItem/TransactionsDescItem';
// import TransactionsMobileItem from '../TransactionsMobileItem/TransactionsMobileItem';
// import Loader from '../Loader/Loader';
// import { useMedia } from '../../hooks/useMedia';

// import styles from './TransactionsList.module.css';

// const TransactionsList = () => {
//   const { transactions, loading } = useSelector(state => state.transactions);
//   const { isMobile } = useMedia();

//   if (loading) {
//     return <Loader />;
//   }

//   if (!transactions.length) {
//     return (
//       <div className={styles.emptyMessage}>
//         <p>You have no transactions yet.</p>
//       </div>
//     );
//   }

//   return (
//     <ul className={styles.list}>
//       {transactions.map(transaction =>
//         isMobile ? (
//           <TransactionsMobileItem key={transaction.id} transaction={transaction} />
//         ) : (
//           <TransactionItem key={transaction.id} transaction={transaction} />
//         )
//       )}
//     </ul>
//   );
// };

// export default TransactionsList;



import React from 'react';


export const TransactionsList = () => {


  return (
    <div>
      <h2>Transaction List Placeholder</h2>
      <p>Table content will be here...</p>
    </div>
  );
};

