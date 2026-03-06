// src/pages/admin/AdminDashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { FaPlusCircle, FaList, FaEdit, FaSignOutAlt } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <h1>🍇 Admin Dashboard</h1>
      <p>Welcome! Manage your fruits and orders from here.</p>

      <div className="admin-actions">
        <button onClick={() => navigate("/admin/add-fruit")}>
          <FaPlusCircle className="icon" /> Add Fruit
        </button>
        <button onClick={() => navigate("/admin/view-fruits")}>
          <FaList className="icon" /> View Fruits
        </button>
        <button onClick={() => navigate("/admin/edit-fruit")}>
          <FaEdit className="icon" /> Edit Fruit
        </button>
        <button className="logout" onClick={logout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
