import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">🍎 Fruit Farm</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">User Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/admin/login">Admin Login</Link></li> {/* ✅ Added Admin Login */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
