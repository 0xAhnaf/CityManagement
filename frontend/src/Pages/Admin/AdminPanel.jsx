import { useState } from "react";
import "./AdminPanel.css";
import Overview from "../../components/Overview/Overview";
import Complaints from "../../components/Complaints/Complaints";
import Donors from "../../components/Donors/Donors";
import Events from "../../components/Events/Events";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

const navItems = [
  { key: "dashboard", label: "Overview" },
  { key: "complaints", label: "Complaints" },
  { key: "donors", label: "Blood Donors" },
  { key: "events", label: "Events" },
];

export default function AdminPanel() {
  const [tab, setTab] = useState("dashboard");
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="admin-wrapper">
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <span className="admin-sidebar-label">City Admin</span>
          <span className="admin-sidebar-title">Dashboard</span>
        </div>

        
          <nav className="admin-nav">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`admin-nav-btn ${tab === key ? "active" : ""}`}
              >
                {label}
              </button>
            ))}
          </nav>
          
          <button onClick={logout} className={`admin-nav-btn`}>
            Log out
          </button>
        

        <div className="admin-sidebar-footer">
          <span className="admin-footer-label">Logged in as</span>
          <span className="admin-footer-name">Admin</span>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {tab === "dashboard" && <Overview />}
        {tab === "complaints" && <Complaints />}
        {tab === "donors" && <Donors />}
        {tab === "events" && <Events />}
      </main>
    </div>
  );
}
