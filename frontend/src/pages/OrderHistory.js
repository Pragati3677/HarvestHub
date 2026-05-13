import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const userPhone = localStorage.getItem("userPhone");
  const userName = localStorage.getItem("userName");

  // Protect route
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      alert("🔐 Please login first!");
      navigate("/login");
    }
  }, [navigate]);

  // Fetch orders by phone first, then by name as fallback
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let foundOrders = [];

        // Try by phone first
        if (userPhone) {
          const res = await fetch(`https://harvesthub-backend-xh5u.onrender.com/api/orders/my-orders/${userPhone}`);
          const data = await res.json();
          if (data && data.length > 0) {
            foundOrders = data;
          }
        }

        // If no orders found by phone, try by name
        if (foundOrders.length === 0 && userName) {
          const res = await fetch(`https://harvesthub-backend-xh5u.onrender.com/api/orders/by-name/${encodeURIComponent(userName)}`);
          const data = await res.json();
          foundOrders = data || [];
        }

        setOrders(foundOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [userPhone, userName]);

  if (loading) {
    return (
      <div className="history-page">
        <div className="history-loading">
          <div className="history-spinner" />
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="history-page">
      <div className="history-container">

        <div className="history-header">
          <div>
            <h2>📜 My Orders</h2>
            <p>Welcome, {userName}! You have {orders.length} order(s).</p>
          </div>
          <button className="shop-btn" onClick={() => navigate("/fruits")}>
            🍎 Continue Shopping
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>🛒</p>
            <h3>No orders yet!</h3>
            <p>Start shopping to see your orders here.</p>
            <button onClick={() => navigate("/fruits")}>Shop Now</button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>

                {/* Order Header */}
                <div className="order-card__header"
                  onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}>
                  <div className="order-card__left">
                    <div className="order-id">
                      🆔 {order._id.slice(-8).toUpperCase()}
                    </div>
                    <div className="order-meta">
                      <span>📅 {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric"
                      })}</span>
                      <span>🍎 {order.items.length} item(s)</span>
                    </div>
                  </div>
                  <div className="order-card__right">
                    <span className="order-price">₹{order.totalPrice}</span>
                    <span className={`order-status ${order.status === "Delivered" ? "delivered" : "pending"}`}>
                      {order.status === "Delivered" ? "✅ Delivered" : "⏳ Pending"}
                    </span>
                    <span className="expand-icon">
                      {expandedId === order._id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                {expandedId === order._id && (
                  <div className="order-card__body">
                    <div className="order-body-grid">

                      <div className="order-items-section">
                        <h4>🍎 Items Ordered</h4>
                        {order.items.map((item, i) => (
                          <div className="order-item-row" key={i}>
                            <span>{item.name}</span>
                            <span>₹{item.price} × {item.qty} kg</span>
                            <strong>₹{item.price * item.qty}</strong>
                          </div>
                        ))}
                        <div className="order-total-row">
                          <strong>Total</strong>
                          <strong>₹{order.totalPrice}</strong>
                        </div>
                      </div>

                      <div className="order-delivery-section">
                        <h4>📦 Delivery Info</h4>
                        <div className="info-row">
                          <span>📍 Address</span>
                          <strong>{order.address}</strong>
                        </div>
                        <div className="info-row">
                          <span>📞 Phone</span>
                          <strong>{order.phone}</strong>
                        </div>
                        <div className="info-row">
                          <span>💳 Payment</span>
                          <strong>{order.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : "Online ✅"}</strong>
                        </div>
                        <div className="info-row">
                          <span>📊 Status</span>
                          <strong className={
                            order.status === "Delivered" ? "text-green" : "text-orange"
                          }>
                            {order.status}
                          </strong>
                        </div>
                      </div>

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

export default OrderHistory;