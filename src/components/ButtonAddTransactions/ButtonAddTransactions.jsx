import { FiPlus } from "react-icons/fi";
import s from "./ButtonAddTransactions.module.css";

import { useDispatch } from "react-redux";
import { openModalAddTransaction } from "../../redux/modal/modalSlice";
// import { addTransactions } from "../../redux/transactions/operations";

const ButtonAddTransactions = () => {
  const dispatch = useDispatch();

  return (
    <button
      className={s.btn}
      type="button"
      onClick={() => {
        dispatch(openModalAddTransaction());
      }}
    >
      <FiPlus className={s.icon} />
    </button>
  );
};

export default ButtonAddTransactions;
