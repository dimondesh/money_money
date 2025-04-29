import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../redux/auth/operations';
import { clearAuthData } from '../../redux/auth/slice';
import Modal from '../Modal/Modal';
import { toast } from 'react-toastify';
import styles from './Header.module.css';


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = useSelector(state => state.auth?.user?.email);
  const isLoggedIn = useSelector(state => !!state.auth?.token);
  const userName = userEmail ? userEmail.split('@')[0] : 'User';

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
       navigate('/login');
    } catch (error) {
      toast.error(error?.message || 'Logout failed');
      dispatch(clearAuthData());
      localStorage.removeItem('authToken');
      navigate('/login');
    } finally {
       setIsModalOpen(false);
    }
  };

  // if (!isLoggedIn) {
  //    return null;
  // }

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.logoContainer}>
         <span className={styles.logoText}>Money Guard</span>
      </div>
      <div className={styles.userInfo}>
        <span className={styles.userName}>{userName}</span>
        <button onClick={() => setIsModalOpen(true)} className={styles.exitButton}>
           <span>Exit</span>
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
           <h2 className={styles.modalTitle}>Log out</h2>
           <p>Are you sure you want to log out?</p>
           <div style={{ marginTop: '20px', textAlign: 'right' }}>
               <button onClick={handleLogout} className={styles.modalLogoutButton}>Log out</button>
               <button onClick={() => setIsModalOpen(false)} className={styles.modalCancelButton}>Cancel</button>
           </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;