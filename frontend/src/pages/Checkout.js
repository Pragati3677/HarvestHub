import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [paymentId, setPaymentId] = useState("");

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  // Save order to MongoDB
  const saveOrder = async (pmtMethod, pmtId = "") => {
    try {
      const res = await fetch("https://harvesthub-backend-xh5u.onrender.com/api/orders/place-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          items: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
          totalPrice,
          paymentMethod: pmtMethod,
          paymentId: pmtId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderId(data.orderId);
        setOrdered(true);
      } else {
        alert("❌ Failed to save order: " + data.error);
      }
    } catch (err) {
      alert("❌ Cannot connect to server.");
    }
  };

  // Razorpay payment
  const handleRazorpay = async () => {
    try {
      // Step 1: Create order on backend
      const res = await fetch("https://harvesthub-backend-xh5u.onrender.com/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice }),
      });
      const data = await res.json();

      // Step 2: Open Razorpay with or without orderId
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "🌾 HarvestHub",
        description: "Fresh Fruits Order",
        handler: async (response) => {
          // Step 3: Save order directly after payment
          const pmtId = response.razorpay_payment_id || "";
          setPaymentId(pmtId);
          await saveOrder("online", pmtId);
        },
        prefill: { name: customerName, contact: phone },
        theme: { color: "#2e7d32" },
        modal: {
          ondismiss: () => alert("Payment cancelled. Please try again."),
        },
      };

      // Add order_id only if available
      if (data.orderId) {
        options.order_id = data.orderId;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      alert("❌ Payment failed. Is backend running?");
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !address.trim() || !phone.trim()) {
      alert("Please fill in all fields!");
      return;
    }
    if (paymentMethod === "cod") {
      await saveOrder("cod");
    } else {
      await handleRazorpay();
    }
  };

  // Empty cart
  if (cartItems.length === 0 && !ordered) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <p>🛒</p>
          <h2>Your cart is empty!</h2>
          <button onClick={() => navigate("/fruits")}>← Go Back to Shop</button>
        </div>
      </div>
    );
  }

  // Success screen
  if (ordered) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-anim">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your fresh fruits will be delivered soon!</p>
          <div className="success-details">
            <div className="success-row"><span>👤 Name</span><strong>{customerName}</strong></div>
            <div className="success-row"><span>📦 Items</span><strong>{cartItems.length} fruits</strong></div>
            <div className="success-row"><span>💰 Total</span><strong>₹{totalPrice}</strong></div>
            <div className="success-row">
              <span>🚚 Payment</span>
              <strong>{paymentMethod === "cod" ? "Cash on Delivery" : "Online ✅"}</strong>
            </div>
            {paymentId && (
              <div className="success-row">
                <span>🔖 Payment ID</span>
                <strong className="pay-id">{paymentId}</strong>
              </div>
            )}
            {orderId && (
              <div className="success-row">
                <span>🆔 Order ID</span>
                <strong className="pay-id">{orderId}</strong>
              </div>
            )}
            <div className="success-row"><span>📍 Address</span><strong>{address}</strong></div>
            <div className="success-row"><span>📞 Phone</span><strong>{phone}</strong></div>
          </div>
          <button className="continue-btn" onClick={() => navigate("/fruits")}>
            🍎 Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">

        {/* Order Summary */}
        <div className="order-summary-panel">
          <h2>🧾 Order Summary</h2>
          <div className="order-items">
            {cartItems.map((item) => (
              <div className="order-item" key={item._id}>
                <div className="order-item__info">
                  <strong>{item.name}</strong>
                  <span>₹{item.price} × {item.qty} kg</span>
                </div>
                <span className="order-item__total">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="order-totals">
            <div className="total-row"><span>Subtotal</span><span>₹{totalPrice}</span></div>
            <div className="total-row"><span>Delivery</span><span className="free">FREE 🚚</span></div>
            <div className="total-row total-row--grand">
              <strong>Grand Total</strong><strong>₹{totalPrice}</strong>
            </div>
          </div>
        </div>

        {/* Delivery + Payment Form */}
        <div className="checkout-form-panel">
          <h2>📦 Delivery Details</h2>
          <form onSubmit={handleOrder} className="checkout-form">

            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your full name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Full Address</label>
              <textarea placeholder="House No, Street, City, Pincode..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3} required />
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <div className="payment-options">
                <label className={`payment-opt ${paymentMethod === "cod" ? "active" : ""}`}>
                  <input type="radio" value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")} />
                  <span className="pay-icon">💵</span>
                  <div>
                    <strong>Cash on Delivery</strong>
                    <small>Pay when you receive your fruits</small>
                  </div>
                </label>

                <label className={`payment-opt ${paymentMethod === "online" ? "active" : ""}`}>
                  <input type="radio" value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")} />
                  <span className="pay-icon">💳</span>
                  <div>
                    <strong>Pay Online</strong>
                    <small>UPI · Cards · Net Banking · Wallets</small>
                  </div>
                </label>
              </div>

              {paymentMethod === "online" && (
                <div className="razorpay-info">
                  <p>🔒 Secure payment powered by</p>
                  <strong style={{ color: "#2e7d32", fontSize: "18px" }}>Razorpay</strong>
                  <div className="pay-methods-icons">
                    <span>📱 UPI</span>
                    <span>💳 Cards</span>
                    <span>🏦 Net Banking</span>
                    <span>👛 Wallets</span>
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="place-order-btn">
              {paymentMethod === "cod"
                ? `✅ Place Order — ₹${totalPrice}`
                : `💳 Pay ₹${totalPrice} via Razorpay`}
            </button>

            <button type="button" className="back-link"
              onClick={() => navigate("/fruits")}>
              ← Back to Cart
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;