import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const FormButton = ({ isLink, to, type = "button", className, children }) => {
  return isLink ? (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  ) : (
    <button type={type} className={className}>
      {children}
    </button>
  );
};

FormButton.propTypes = {
  isLink: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormButton;
