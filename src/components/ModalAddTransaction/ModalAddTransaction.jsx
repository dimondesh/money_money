import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { closeModalAddTransaction } from "@redux/modal/modalSlice";
// import { selectIsModalAddTransactionOpen } from "@/redux/modal/selectors";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import styles from "./ModalAddTransaction.module.css";
import Modal from "components/Modal/Modal";
import { selectIsModalAddTransactionOpen } from "@redux/modal/selectors";

const modalRoot = document.getElementById("modal-root");

const ModalAddTransaction = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalAddTransactionOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        dispatch(closeModalAddTransaction());
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModalAddTransaction());
    }
  };

  const handleClose = () => {
    dispatch(closeModalAddTransaction());
  };

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <Modal onClose={handleClose} className={styles.modal}>
        <AddTransactionForm closeModal={handleClose} />
      </Modal>
    </div>,
    modalRoot
  );
};

export default ModalAddTransaction;
