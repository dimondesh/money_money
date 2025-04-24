import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';

const Header = ({ onLogout }) => {
  const email = useSelector(state => state.auth.user?.email || 'user@example.com');
  const username = email.split('@')[0];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Finance App</div>
        <div className={styles.userInfo}>
          <span className={styles.username}>{username}</span>
          <button onClick={onLogout} className={styles.logoutButton}>Exit</button>
        </div>
      </div>
    </header>
  );
};

export default Header;