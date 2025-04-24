import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      {}
      <Outlet />
    </div>
  );
};

export default Dashboard;
