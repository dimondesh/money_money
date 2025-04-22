import { NavLink } from "react-router-dom";
import css from "./FormButton.module.css";

const FormButton = ({ isLink, to, type = "button", children }) => {
  const buttonStyle = isLink ? css.navLinkBtn : css.submitBtn;

  return isLink ? (
    <NavLink to={to} className={buttonStyle}>
      {children}
    </NavLink>
  ) : (
    <button type={type} className={buttonStyle}>
      {children}
    </button>
  );
};

export default FormButton;
