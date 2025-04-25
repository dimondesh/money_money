import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Statistics
          </NavLink>
        </li>
        <li className={styles.mobileOnly}>
          <NavLink
            to="/currency"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Currency
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;