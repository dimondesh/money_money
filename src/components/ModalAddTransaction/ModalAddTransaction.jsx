import React from 'react';
import Modal from '../Modal/Modal';


export const AddTransactionModal = ({ onClose }) => {


  return (
    <Modal onClose={onClose}>
      <div>
        <h2>Add transaction</h2>
        <p>Transaction Form Placeholder...</p>
         <button type="button" onClick={onClose} style={{marginTop: '20px'}}>Close Me</button>
      </div>
    </Modal>
  );
};