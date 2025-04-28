import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header.jsx";
import Navigation from "../../components/Navigation/Navigation.jsx";
import Balance from "../../components/Balance/Balance.jsx";
import Currency from "../../components/Currency/Currency.jsx";
import styles from "./Dashboard.module.css";
import { SidebarGraph } from "components/SidebarGraph/SidebarGraph.jsx";

const Dashboard = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1199px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <div className={styles.contentWrapper}>
        {(isTablet || isDesktop) && (
          <aside className={styles.sidebar}>
            <Navigation />
            <Balance />
            {isDesktop && <Currency />}
            {isDesktop && <SidebarGraph />}
          </aside>
        )}

        {isMobile && (
          <div className={styles.mobileNavBalanceContainer}>
            <Navigation />
            <Balance />
          </div>
        )}

        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
