import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutThunk } from "../../redux/auth/operations";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutThunk());
    navigate("/login");
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Log out
        </button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
