import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPhone");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🍎 HarvestHub
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">User Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/fruits">🍎 Shop</Link></li>
            <li><Link to="/my-orders">📜 My Orders</Link></li>
            <li><span className="nav-username">👋 {userName}</span></li>
            <li>
              <button className="nav-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
        <li><Link to="/admin/login">Admin</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;