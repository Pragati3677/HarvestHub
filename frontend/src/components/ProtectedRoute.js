// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn"); // Check authentication
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return children;  // Render children (AdminDashboard) if authenticated
};

export default ProtectedRoute;
