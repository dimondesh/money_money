import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (document.body) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (document.body) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  if (!modalRoot) {
      console.error("Modal root element '#modal-root' not found in the DOM.");
      return null;
  }


  return createPortal(
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
// import React, { useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import styles from './Modal.module.css';
// import PropTypes from 'prop-types';

// const modalRoot = document.querySelector('#modal-root');

// const Modal = ({ children, onClose }) => {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === 'Escape') {
//         onClose();
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     document.body.style.overflow = 'hidden';

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       document.body.style.overflow = 'auto';
//     };
//   }, [onClose]);

//   const handleBackdropClick = (event) => {
//     if (event.currentTarget === event.target) {
//       onClose();
//     }
//   };

//   if (!modalRoot) return null;

//   return createPortal(
//     <div className={styles.backdrop} onClick={handleBackdropClick}>
//       <div className={styles.modal}>{children}</div>
//     </div>,
//     modalRoot
//   );
// };

// Modal.propTypes = {
//   children: PropTypes.node.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default Modal;