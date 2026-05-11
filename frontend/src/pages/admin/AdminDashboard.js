import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, ArcElement,
  Title, Tooltip, Legend,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  LineElement, PointElement, ArcElement,
  Title, Tooltip, Legend
);

function AdminDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/orders/all").then((r) => r.json()),
      fetch("http://localhost:5000/api/fruits/all").then((r) => r.json()),
    ])
      .then(([ordersData, fruitsData]) => {
        setOrders(ordersData);
        setFruits(fruitsData);
        setLoading(false);
      })
      .catch(() => {
        alert("❌ Cannot connect to server.");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  // Stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "Delivered").length;

  // Last 7 days labels
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
  });

  // Orders by day
  const ordersByDay = last7Days.map((day) =>
    orders.filter((o) =>
      new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) === day
    ).length
  );

  // Revenue by day
  const revenueByDay = last7Days.map((day) =>
    orders
      .filter((o) =>
        new Date(o.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) === day
      )
      .reduce((sum, o) => sum + o.totalPrice, 0)
  );

  // Top fruits
  const fruitCount = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      fruitCount[item.name] = (fruitCount[item.name] || 0) + item.qty;
    });
  });
  const topFruits = Object.entries(fruitCount).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Chart data
  const ordersChartData = {
    labels: last7Days,
    datasets: [{ label: "Orders", data: ordersByDay,
      backgroundColor: "rgba(46,125,50,0.7)", borderColor: "#2e7d32",
      borderWidth: 2, borderRadius: 8 }],
  };

  const revenueChartData = {
    labels: last7Days,
    datasets: [{ label: "Revenue (₹)", data: revenueByDay,
      borderColor: "#9c27b0", backgroundColor: "rgba(156,39,176,0.1)",
      borderWidth: 2, pointBackgroundColor: "#9c27b0",
      pointRadius: 5, fill: true, tension: 0.4 }],
  };

  const statusChartData = {
    labels: ["Pending", "Delivered"],
    datasets: [{ data: [pendingOrders, deliveredOrders],
      backgroundColor: ["#ff9800", "#2e7d32"],
      borderColor: ["#f57c00", "#1b5e20"], borderWidth: 2 }],
  };

  const topFruitsChartData = {
    labels: topFruits.map(([name]) => name),
    datasets: [{ label: "Qty (kg)", data: topFruits.map(([, qty]) => qty),
      backgroundColor: ["rgba(46,125,50,0.8)","rgba(156,39,176,0.8)",
        "rgba(33,150,243,0.8)","rgba(255,152,0,0.8)","rgba(244,67,54,0.8)"],
      borderRadius: 8 }],
  };

  const chartOpts = { responsive: true,
    plugins: { legend: { position: "bottom" } },
    scales: { y: { beginAtZero: true } } };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dash-spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">

      {/* Header */}
      <div className="dash-header">
        <div>
          <h1>🌾 Admin Dashboard</h1>
          <p>Welcome back! Here's your HarvestHub overview.</p>
        </div>
        <div className="dash-header-actions">
          <button className="dash-nav-btn" onClick={() => navigate("/admin/add-product")}>➕ Add Fruit</button>
          <button className="dash-nav-btn" onClick={() => navigate("/admin/view-products")}>📋 Fruits</button>
          <button className="dash-nav-btn" onClick={() => navigate("/admin/edit-product")}>✏️ Edit</button>
          <button className="dash-nav-btn dash-nav-btn--orders" onClick={() => navigate("/admin/orders")}>📦 Orders</button>
          <button className="dash-nav-btn dash-nav-btn--logout" onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="dash-stats">
        <div className="dash-stat-card" style={{ borderLeft: "4px solid #2196f3" }}>
          <div className="dash-stat-icon">📦</div>
          <div><strong>{totalOrders}</strong><p>Total Orders</p></div>
        </div>
        <div className="dash-stat-card" style={{ borderLeft: "4px solid #2e7d32" }}>
          <div className="dash-stat-icon">💰</div>
          <div><strong>₹{totalRevenue}</strong><p>Total Revenue</p></div>
        </div>
        <div className="dash-stat-card" style={{ borderLeft: "4px solid #ff9800" }}>
          <div className="dash-stat-icon">⏳</div>
          <div><strong>{pendingOrders}</strong><p>Pending</p></div>
        </div>
        <div className="dash-stat-card" style={{ borderLeft: "4px solid #9c27b0" }}>
          <div className="dash-stat-icon">✅</div>
          <div><strong>{deliveredOrders}</strong><p>Delivered</p></div>
        </div>
        <div className="dash-stat-card" style={{ borderLeft: "4px solid #009688" }}>
          <div className="dash-stat-icon">🍎</div>
          <div><strong>{fruits.length}</strong><p>Fruit Types</p></div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="charts-row">
        <div className="chart-card chart-card--wide">
          <h3>📈 Orders — Last 7 Days</h3>
          <Bar data={ordersChartData} options={chartOpts} />
        </div>
        <div className="chart-card">
          <h3>🍩 Order Status</h3>
          {totalOrders === 0
            ? <div className="no-chart-data">No orders yet!</div>
            : <Doughnut data={statusChartData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
          }
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-row">
        <div className="chart-card chart-card--wide">
          <h3>💰 Revenue — Last 7 Days</h3>
          <Line data={revenueChartData} options={chartOpts} />
        </div>
        <div className="chart-card">
          <h3>🏆 Top Ordered Fruits</h3>
          {topFruits.length === 0
            ? <div className="no-chart-data">No orders yet!</div>
            : <Bar data={topFruitsChartData} options={{ ...chartOpts, indexAxis: "y" }} />
          }
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;