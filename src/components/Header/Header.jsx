import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "@redux/auth/operations";
import { clearAuthData } from "@redux/auth/slice";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";
import styles from "./Header.module.css";
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userEmail = useSelector((state) => state.auth?.user?.email);
  const isLoggedIn = useSelector((state) => !!state.auth?.token);
  const userName = userEmail ? userEmail.split("@")[0] : "User";

  const handleLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || "Logout failed");
      dispatch(clearAuthData());
      localStorage.removeItem("authToken");
      navigate("/login");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.logoContainer}>
        <img src="/money-guard.svg" alt="Logo" className={styles.logoIcon} />
        <span className={styles.logoText}>Money Guard</span>
      </div>
      <div className={styles.userInfo}>
        <span className={styles.userName}>{userName}</span>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.exitButton}
        >
          <FaSignOutAlt />
          <span className={styles.exitText}>Exit</span>
        </button>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className={styles.modalTitle}>Log out</h2>
          <p style={{ marginBottom: "30px", color: "var(--white-60)" }}>
            Are you sure you want to log out?
          </p>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "15px" }}
          >
            <button onClick={handleLogout} className={styles.modalLogoutButton}>
              Log out
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className={styles.modalCancelButton}
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;
