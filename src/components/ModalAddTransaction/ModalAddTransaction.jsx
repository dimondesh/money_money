

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPortal } from 'react-dom';
// import { closeModalAddTransaction } from '../../redux/modal/modalSlice';
// import { selectIsModalAddTransactionOpen } from '../../redux/modal/selectors';
// import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
// import styles from './ModalAddTransaction.module.css';

// const modalRoot = document.getElementById('modal-root');

// const ModalAddTransaction = () => {
//   const dispatch = useDispatch();
//   const isOpen = useSelector(selectIsModalAddTransactionOpen);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === 'Escape') {
//         dispatch(closeModalAddTransaction());
//       }
//     };

//     if (isOpen) {
//       window.addEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [dispatch, isOpen]);

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       dispatch(closeModalAddTransaction());
//     }
//   };

//   const handleClose = () => {
//     dispatch(closeModalAddTransaction());
//   };

//   if (!isOpen) return null;

//   return createPortal(
//     <div className={styles.backdrop} onClick={handleBackdropClick}>
//       <div className={styles.modal}>
//         <AddTransactionForm closeModal={handleClose} />
//       </div>
//     </div>,
//     modalRoot
//   );
// };

// export default ModalAddTransaction;

// import React from 'react';
// import Modal from '../Modal/Modal';
// import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';


// export const AddTransactionModal = ({ onClose }) => {


//   return (
//     <Modal onClose={onClose}>
//       <div>
//         <AddTransactionForm/>
//         {/* <h2>Add transaction</h2>
//         <p>Transaction Form Placeholder...</p>
//          <button type="button" onClick={onClose} style={{marginTop: '20px'}}>Close Me</button> */}
//       </div>
//     </Modal>
//   );
// };

import React from 'react';
import Modal from '../Modal/Modal';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';


export const AddTransactionModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <AddTransactionForm closeModal={onClose} />
    </Modal>
  );
};

