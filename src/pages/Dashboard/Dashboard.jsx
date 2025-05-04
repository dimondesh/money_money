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
// import ModalEditTransaction from "components/ModalEditTransaction/ModalEditTransaction";

const Dashboard = () => {
  const isAddModalOpen = useSelector(selectIsModalAddTransactionOpen);

  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(closeModalAddTransaction());

  const isMobile = useMediaQuery({ query: "(max-width: 767.98px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1199.98px)",
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
        {isDesktop && (
          <main className={styles.desktopWrapper}>
            <aside className={styles.sidebar}>
              <Navigation />
              {isDesktop && <Balance />}
              <div className={styles.curGraph}>
                {isDesktop && <Currency />}
                {isDesktop && <SidebarGraph />}
              </div>
            </aside>
            <Outlet />
            {isDesktop && <ButtonAddTransactions />}
          </main>
        )}
        {isTablet && (
          <main className={styles.mainContent}>
            <div className={styles.tabletWrapper}>
              <div className={styles.navBalCur}>
                <div className={styles.navBal}>
                  {isTablet && <Navigation />}
                  {isTablet && <Balance />}
                </div>{" "}
                <div className={styles.currencyGraph}>
                  {isTablet && <Currency />} {isTablet && <SidebarGraph />}
                </div>
              </div>
              <Outlet />
              {isTablet && <ButtonAddTransactions />}
            </div>
          </main>
        )}

        {isMobile && (
          <div className={styles.mobileOnlyContent}>
            <Navigation />
            <Balance />
            <Outlet />
          </div>
        )}
      </div>

      {isAddModalOpen && <ModalAddTransaction onClose={handleCloseModal} />}
    </div>
  );
};

export default Dashboard;
