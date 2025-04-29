import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Header from '../../components/Header/Header';
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";
import Currency from '../../components/Currency/Currency';
import styles from "./Dashboard.module.css";

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

  return (
    <div className={styles.pageWrapper}>
       <Header />

       <div className={styles.contentWrapper}>
          {isTabletOrDesktop && (
            <aside className={styles.sidebar}>
              <Navigation />
              <Balance />
              <Currency />
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

export default DashboardPage;

