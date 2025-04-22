import { NavLink } from "react-router-dom";
import s from "./FormButton.module.css";

const FormButton = ({ isLink, to, type = "button", children }) => {
  if (isLink) {
    return (
      <NavLink to={to} className={s.linkBtn}>
        {children}
      </NavLink>
    );
  }

  return (
    <button type={type} className={s.submitBtn}>
      {children}
    </button>
  );
};

export default FormButton;
