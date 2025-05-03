import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";
// import { selectIsEditModalOpen } from "@redux/modals/selectors";
import { useSelector } from "react-redux";
import Modal from "components/Modal/Modal";
import { closeModalEditTransaction } from "@redux/modal/modalSlice";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

const ModalEditTransaction = () => {
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
