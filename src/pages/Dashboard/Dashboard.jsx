import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { closeAddModal } from "../../redux/modals/slice";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
// import SidebarGraph from "../../components/SidebarGraph/SidebarGraph";
import { AddTransactionModal } from "../../components/ModalAddTransaction/ModalAddTransaction";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";

<<<<<<< HEAD
<<<<<<< HEAD

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };
=======
const DashboardPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 768px)' });
>>>>>>> main
=======
import styles from "./Dashboard.module.css";
import { SidebarGraph } from "../../components/SidebarGraph/SidebarGraph";

const Dashboard = () => {
  const isAddModalOpen = useSelector((state) => state.modals.isAddModalOpen);
  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(closeAddModal());

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1199px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const location = useLocation();
  useEffect(() => {
    dispatch(closeAddModal());
  }, [location, dispatch]);
>>>>>>> main

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <div className={styles.contentWrapper}>
        {(isTablet || isDesktop) && (
          <aside className={styles.sidebar}>
            <Navigation />
            {isDesktop && <Balance />}
            {isDesktop && <Currency />}
            {isDesktop && <SidebarGraph />}
          </aside>
        )}

        <main className={styles.mainContent}>
          {isTablet && <Balance />}
          <Outlet />
          {(isTablet || isDesktop) && <ButtonAddTransactions />}
        </main>

        {isMobile && (
          <div className={styles.mobileOnlyContent}>
            <Balance />
            <Navigation />
            <Outlet />
            <ButtonAddTransactions />
          </div>
        )}
      </div>

      {isAddModalOpen && <AddTransactionModal onClose={handleCloseModal} />}
    </div>
  );
};

<<<<<<< HEAD
export default DashboardPage;

=======
export default Dashboard;
>>>>>>> main
