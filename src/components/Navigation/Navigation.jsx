import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import styles from './Navigation.module.css';
import { FaHome, FaChartBar, FaDollarSign } from 'react-icons/fa';

const Navigation = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTabletOrDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <nav className={styles.navWrapper}>
      <NavLink to="/dashboard/home" className={getNavLinkClass}>
         <FaHome className={styles.navIcon}/>
         {isTabletOrDesktop && <span className={styles.navText}>Home</span>}
         {isMobile && <span className={styles.navText}>Home</span>}
      </NavLink>
      <NavLink to="/dashboard/statistics" className={getNavLinkClass}>
         <FaChartBar className={styles.navIcon}/>
         {isTabletOrDesktop && <span className={styles.navText}>Statistics</span>}
         {isMobile && <span className={styles.navText}>Statistics</span>}
      </NavLink>
      {isMobile && (
        <NavLink to="/dashboard/currency" className={getNavLinkClass}>
          <FaDollarSign className={styles.navIcon}/>
          <span className={styles.navText}>Currency</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;