import css from "./Modal.module.css";

const Modal = ({ title, onConfirm, onCancel }) => {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <h2 className={css.title}>{title}</h2>
        <div className={css.buttons}>
          <button className={css.confirm} onClick={onConfirm}>
            Log out
          </button>
          <button className={css.cancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
