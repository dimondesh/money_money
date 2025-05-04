import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./Navigation.module.css";
import { FaHome, FaChartBar, FaDollarSign } from "react-icons/fa";

const Navigation = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767.98px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1199px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;

  return (
    <nav className={styles.navWrapper}>
      <NavLink to="/" className={getNavLinkClass}>
        <FaHome className={styles.navIcon} />
        {isMobile && <span className={styles.navText}></span>}
        {isTablet && <span className={styles.navText}>Home</span>}
        {isDesktop && <span className={styles.navText}>Home</span>}
      </NavLink>
      <NavLink to="/statistics" className={getNavLinkClass}>
        <FaChartBar className={styles.navIcon} />
        {isMobile && <span className={styles.navText}></span>}
        {isTablet && <span className={styles.navText}>Statistics</span>}
        {isDesktop && <span className={styles.navText}>Statistics</span>}
      </NavLink>
      {isMobile && (
        <NavLink to="/currency" className={getNavLinkClass}>
          <FaDollarSign className={styles.navIcon} />
          <span className={styles.navText}></span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
