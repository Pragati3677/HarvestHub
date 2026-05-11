import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AddProduct from "./AddProduct";
import ViewProduct from "./ViewProduct";
import EditProduct from "./EditProduct";
import AdminOrders from "./AdminOrders";

function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="view-products" element={<ViewProduct />} />
      <Route path="edit-product" element={<EditProduct />} />
      <Route path="orders" element={<AdminOrders />} />
    </Routes>
  );
}

export default AdminApp;