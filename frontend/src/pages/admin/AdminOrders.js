import React, { useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/all");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      alert("❌ Cannot connect to server.");
    }
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => o._id === id ? { ...o, status: newStatus } : o)
        );
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      alert("❌ Failed to update status.");
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    return o.status.toLowerCase() === filter.toLowerCase();
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-loading">
          <div className="orders-spinner" />
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">

        {/* Header */}
        <div className="orders-header">
          <div>
            <h2>📋 All Orders</h2>
            <p>{orders.length} total orders</p>
          </div>
          <button className="refresh-btn" onClick={fetchOrders}>🔄 Refresh</button>
        </div>

        {/* Stats Cards */}
        <div className="orders-stats">
          <div className="stat-card stat-card--total">
            <span className="stat-icon">📦</span>
            <div>
              <strong>{orders.length}</strong>
              <p>Total Orders</p>
            </div>
          </div>
          <div className="stat-card stat-card--pending">
            <span className="stat-icon">⏳</span>
            <div>
              <strong>{pendingCount}</strong>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-card stat-card--delivered">
            <span className="stat-icon">✅</span>
            <div>
              <strong>{deliveredCount}</strong>
              <p>Delivered</p>
            </div>
          </div>
          <div className="stat-card stat-card--revenue">
            <span className="stat-icon">💰</span>
            <div>
              <strong>₹{totalRevenue}</strong>
              <p>Total Revenue</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {["all", "Pending", "Delivered"].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${filter === tab ? "active" : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab === "all" ? "All Orders" : tab}
              <span className="tab-count">
                {tab === "all" ? orders.length :
                 orders.filter((o) => o.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="no-orders">
            <p>📭</p>
            <p>No {filter !== "all" ? filter : ""} orders found!</p>
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div className="order-card" key={order._id}>

                {/* Order Header */}
                <div className="order-card__header"
                  onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}>
                  <div className="order-card__left">
                    <div className="order-id">
                      🆔 <span>{order._id.slice(-8).toUpperCase()}</span>
                    </div>
                    <div className="order-customer">
                      <strong>{order.customerName}</strong>
                      <span>📞 {order.phone}</span>
                    </div>
                  </div>
                  <div className="order-card__right">
                    <span className="order-price">₹{order.totalPrice}</span>
                    <span className={`order-status ${order.status === "Delivered" ? "delivered" : "pending"}`}>
                      {order.status === "Delivered" ? "✅ Delivered" : "⏳ Pending"}
                    </span>
                    <span className="order-date">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </span>
                    <span className="expand-icon">{expandedId === order._id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* Order Details (Expanded) */}
                {expandedId === order._id && (
                  <div className="order-card__body">
                    <div className="order-details-grid">

                      {/* Items */}
                      <div className="order-detail-section">
                        <h4>🍎 Items Ordered</h4>
                        <div className="order-items-list">
                          {order.items.map((item, i) => (
                            <div className="order-detail-item" key={i}>
                              <span>{item.name}</span>
                              <span>₹{item.price} × {item.qty} kg</span>
                              <strong>₹{item.price * item.qty}</strong>
                            </div>
                          ))}
                        </div>
                        <div className="order-total-row">
                          <strong>Total</strong>
                          <strong>₹{order.totalPrice}</strong>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div className="order-detail-section">
                        <h4>📦 Delivery Info</h4>
                        <div className="delivery-info">
                          <div className="info-row">
                            <span>👤 Name</span>
                            <strong>{order.customerName}</strong>
                          </div>
                          <div className="info-row">
                            <span>📞 Phone</span>
                            <strong>{order.phone}</strong>
                          </div>
                          <div className="info-row">
                            <span>📍 Address</span>
                            <strong>{order.address}</strong>
                          </div>
                          <div className="info-row">
                            <span>💳 Payment</span>
                            <strong>{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online ✅"}</strong>
                          </div>
                          {order.paymentId && (
                            <div className="info-row">
                              <span>🔖 Payment ID</span>
                              <strong className="payment-id">{order.paymentId}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="order-actions">
                      {order.status === "Pending" ? (
                        <button
                          className="action-btn action-btn--deliver"
                          onClick={() => handleStatusUpdate(order._id, "Delivered")}
                        >
                          ✅ Mark as Delivered
                        </button>
                      ) : (
                        <button
                          className="action-btn action-btn--pending"
                          onClick={() => handleStatusUpdate(order._id, "Pending")}
                        >
                          🔄 Mark as Pending
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;