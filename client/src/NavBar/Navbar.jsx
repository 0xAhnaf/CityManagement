import React, { useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthContext();
  const isLoggedIn = user !== null;
  const isAdmin = user?.role === "admin";

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isBloodPage = location.pathname === "/BloodDonation";

  return (
    <nav className={`navbar ${isBloodPage ? "navbar-blood" : ""}`}>
      <NavLink to="/">
        <img src={logo} alt="City Connect Logo" className="nav-logo" />
      </NavLink>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/ReportPage" onClick={() => setMenuOpen(false)}>Complaints</NavLink></li>
        <li><NavLink to="/VolunteerPage" onClick={() => setMenuOpen(false)}>Volunteer</NavLink></li>
        <li><NavLink to="/BloodDonation" onClick={() => setMenuOpen(false)}>Blood donor</NavLink></li>

        {isAdmin && (
          <li>
            <NavLink to="/admin" className="admin-link" onClick={() => setMenuOpen(false)}>
              Admin panel
            </NavLink>
          </li>
        )}

        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/dashboard" className="nav-user-name" onClick={() => setMenuOpen(false)}>
              {user.name}
            </NavLink>
            </li>
            <li>
              <button className="nav-btn logout" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              <button className="nav-btn">Login</button>
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;