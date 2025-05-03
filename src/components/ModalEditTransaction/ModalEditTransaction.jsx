import { useDispatch, useSelector } from "react-redux";

import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
import Modal from "components/Modal/Modal";
import { closeModalEditTransaction } from "../../redux/modal/modalSlice";
import { createPortal } from "react-dom";
import { selectIsEditModalOpen } from "../../redux/modal/selectors";
import { useEffect } from "react";

// import { selectIsEditModalOpen } from "@redux/modals/selectors"; // можливо, ця частина потрібна для доступу до стейту
const modalRoot = document.getElementById("modal-root");
const ModalEditTransaction = () => {
  const dispatch = useDispatch(); // Ініціалізуємо dispatch
  const isOpen = useSelector(selectIsEditModalOpen); // Вибираємо стан modal з Redux (це потрібно для перевірки чи відкритий модал)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        dispatch(closeModalEditTransaction());
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
      dispatch(closeModalEditTransaction());
    }
  };

  const handleClose = () => {
    dispatch(closeModalEditTransaction());
  };

  if (!isOpen) return null;

  return createPortal(
    <Modal onClose={handleClose}>
      <EditTransactionForm closeModal={handleClose} />
    </Modal>,
    modalRoot
  );
};

export default ModalEditTransaction;
