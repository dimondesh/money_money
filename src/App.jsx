import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import Loader from './components/Loader/Loader';
import { refreshUserThunk } from "./redux/auth/operations";
import { selectIsRefreshing } from "./redux/auth/selectors";

const DashboardPage = lazy(() => import('./pages/Dashboard/Dashboard'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const HomeTab = lazy(() => import('./pages/HomeTab/HomeTab'));
const StatisticsTab = lazy(() => import('./pages/StatisticsTab/StatisticsTab'));
const CurrencyTab = lazy(() => import('./pages/CurrencyTab/CurrencyTab'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const globalIsLoading = useSelector(state => state.global?.isLoading);
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  const showLoader = isRefreshing || globalIsLoading;

  return (
    <>
      {showLoader && <Loader />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route
              path="currency"
              element={isMobile ? <CurrencyTab /> : <Navigate to="/" replace />}
            />
          </Route>

          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </>
  );
}

export default App;