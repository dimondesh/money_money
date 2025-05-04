import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Balance.module.css";
import { selectUserBalance } from "@redux/auth/selectors";

const Balance = () => {
  const totalBalance = useSelector(selectUserBalance);

  return (
    <div className={styles.balanceWrapper}>
      <p className={styles.balanceText}>Your balance</p>
      <p className={styles.balanceAmount}>₴ {totalBalance || "0.00"}</p>
    </div>
  );
};

export default Balance;
