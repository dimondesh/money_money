// Файл: PublicRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";
import { useSelector } from "react-redux";
import Loader from "components/Loader/Loader";

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing); 
  const location = useLocation();

  const shouldRedirect = isLoggedIn && !isRefreshing;


  if (isRefreshing) {
    return <Loader />;;
  }

  if (shouldRedirect) {
  
    const fromPage = location.state?.from?.pathname || "/";
    return <Navigate to={fromPage} replace />;
  }


  return children;
};
export default PublicRoute;