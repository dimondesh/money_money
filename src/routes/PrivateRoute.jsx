// Файл: PrivateRoute.jsx (Исправленный)
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
// Добавить импорт selectIsRefreshing
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";
// Можно добавить импорт Loader, если хотите показывать его здесь,
// но можно положиться и на Loader в App.jsx
import Loader from "components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const location = useLocation();

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  if (isRefreshing) {
    return <Loader />;
  }

  if (shouldRedirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
