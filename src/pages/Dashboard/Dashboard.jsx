import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
// import { closeModalAddTransaction } from "../../redux/modal/operations";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import Currency from "../../components/Currency/Currency";
// import { AddTransactionModal } from "../../components/ModalAddTransaction/ModalAddTransaction";
import ButtonAddTransactions from "../../components/ButtonAddTransactions/ButtonAddTransactions";
import styles from "./Dashboard.module.css";
import { SidebarGraph } from "../../components/SidebarGraph/SidebarGraph";
import {
  selectIsModalAddTransactionOpen,
  selectIsModalEditTransactionOpen,
} from "../../redux/modal/selectors";
import { closeModalAddTransaction } from "@redux/modal/modalSlice";
import ModalAddTransaction from "../../components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "components/ModalEditTransaction/ModalEditTransaction";

const Dashboard = () => {
  const isAddModalOpen = useSelector(selectIsModalAddTransactionOpen);

  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(closeModalAddTransaction());

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1199px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const location = useLocation();

  useEffect(() => {
    dispatch(handleCloseModal());
  }, [location, dispatch]);

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
        {!isMobile && (
          <main className={styles.mainContent}>
            {isTablet && <Balance />}
            <Outlet />
            {(isTablet || isDesktop) && <ButtonAddTransactions />}
          </main>
        )}

        {isMobile && (
          <div className={styles.mobileOnlyContent}>
            <Balance />
            <Navigation />
            <Outlet />
            <ButtonAddTransactions />
          </div>
        )}
      </div>

      {isAddModalOpen && <ModalAddTransaction onClose={handleCloseModal} />}
    </div>
  );
};

export default Dashboard;
