import { LoginPage, NotFound } from "./pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./routes";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "components/Loader/Loader";
import { lazy } from "react";
import { refreshUserThunk } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";
import { useMedia } from "./hooks";

const CurrencyTab = lazy(() => import("./pages/CurrencyTab/CurrencyTab"));
const HomeTab = lazy(() => import("./pages/HomeTab/HomeTab"));
const StatisticsTab = lazy(() => import("./pages/StatisticsTab/StatisticsTab"));

const RegistrationPage = lazy(() =>
  import("./pages/RegisterPage/RegistrationPage")
);

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const { isMobile } = useMedia();

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  if (isRefreshing) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/statistics"
          element={
            <PrivateRoute>
              <StatisticsTab />
            </PrivateRoute>
          }
        />
        <Route
          path="/currency"
          element={
            isMobile ? (
              <PrivateRoute>
                <CurrencyTab />
              </PrivateRoute>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

<Route
  path="/home"
  element={
    <PrivateRoute>
      <HomeTab />
    </PrivateRoute>
  }
/>;

export default App;
