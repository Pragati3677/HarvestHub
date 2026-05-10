import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        <div className="dashboard-header">
          <span className="dashboard-icon">🍇</span>
          <h2>Admin Dashboard</h2>
          <p>Welcome! Manage your fruits and orders from here.</p>
        </div>

        <div className="dashboard-buttons">
          <button className="dash-btn dash-btn--add" onClick={() => navigate("/admin/add-product")}>
            <span>➕</span> Add Fruit
          </button>

          <button className="dash-btn dash-btn--view" onClick={() => navigate("/admin/view-products")}>
            <span>📋</span> View Fruits
          </button>

          <button className="dash-btn dash-btn--edit" onClick={() => navigate("/admin/edit-product")}>
            <span>✏️</span> Edit Fruit
          </button>

          <button className="dash-btn dash-btn--logout" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;