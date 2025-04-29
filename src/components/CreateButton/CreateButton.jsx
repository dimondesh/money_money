import { useOutletContext } from 'react-router-dom';
import s from './CreateButton.module.css';
import { IoAddSharp } from 'react-icons/io5';

const CreateButton = () => {
  const { openAddModal } = useOutletContext();
  return (
    <button onClick={() => openAddModal()} type="button" className={s.btn}>
      <IoAddSharp className={s.icon} />
    </button>
  );
};

export default CreateButton;

// import { useDispatch } from 'react-redux';
// import { openModalAddTransaction } from '../../redux/modal/modalSlice';
// import styles from './CreateButton.module.css';
// import { FaPlus } from 'react-icons/fa'; 

// const CreateButton = () => {
//   const dispatch = useDispatch();

//   const handleClick = () => {
//     dispatch(openModalAddTransaction());
//   };

//   return (
//     <button type="button" onClick={handleClick} className={styles.addButton}>
//       <FaPlus size={20} />
//     </button>
//   );
// };

// export default CreateButton;
