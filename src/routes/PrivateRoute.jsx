import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({ component: Component }) => {
  const location = useLocation();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? (
    Component
  ) : (
    <Navigate to="/login" replace state={location} />
  );
};

export default PrivateRoute;
