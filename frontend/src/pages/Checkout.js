import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";

// Your UPI ID — change this to your actual UPI ID
const YOUR_UPI_ID = "your-upi-id@paytm";
const YOUR_NAME = "Fruit Farm";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [], totalPrice = 0 } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [upiOption, setUpiOption] = useState("phonepe");
  const [ordered, setOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── UPI Deep Links ──
  const getUpiLink = () => {
    const amount = totalPrice;
    const note = encodeURIComponent("Fruit Farm Order");
    const name = encodeURIComponent(YOUR_NAME);
    const upi = encodeURIComponent(YOUR_UPI_ID);

    switch (upiOption) {
      case "phonepe":
        return `phonepe://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
      case "googlepay":
        return `tez://upi/pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
      case "paytm":
        return `paytmmp://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
      case "bhim":
        return `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
      default:
        return `upi://pay?pa=${upi}&pn=${name}&am=${amount}&cu=INR&tn=${note}`;
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (!address.trim() || !phone.trim()) {
      alert("Please fill in your address and phone number!");
      return;
    }

    if (paymentMethod === "cod") {
      // Cash on Delivery → directly show success
      setOrdered(true);

    } else if (paymentMethod === "upi") {
      // UPI → open payment app
      setLoading(true);
      const upiLink = getUpiLink();
      window.location.href = upiLink;

      // After 3 seconds assume payment initiated, show success
      setTimeout(() => {
        setLoading(false);
        setOrdered(true);
      }, 3000);

    } else if (paymentMethod === "card") {
      // Card → show alert for now (you can integrate Razorpay later)
      alert("💳 Card payment integration coming soon!\nPlease use UPI or Cash on Delivery.");
    }
  };

  // ── Empty Cart ──
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

  // ── Order Success ──
  if (ordered) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-anim">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your fresh fruits will be delivered soon to your doorstep!</p>
          <div className="success-details">
            <div className="success-row">
              <span>📦 Items</span>
              <strong>{cartItems.length} fruits</strong>
            </div>
            <div className="success-row">
              <span>💰 Total</span>
              <strong>₹{totalPrice}</strong>
            </div>
            <div className="success-row">
              <span>🚚 Payment</span>
              <strong>
                {paymentMethod === "cod" ? "Cash on Delivery" :
                 paymentMethod === "upi" ? "UPI Payment" : "Card Payment"}
              </strong>
            </div>
            <div className="success-row">
              <span>📍 Address</span>
              <strong>{address}</strong>
            </div>
            <div className="success-row">
              <span>📞 Phone</span>
              <strong>{phone}</strong>
            </div>
          </div>
          <button className="continue-btn" onClick={() => navigate("/fruits")}>
            🍎 Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ── Loading (UPI redirect) ──
  if (loading) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <div className="pay-spinner" />
          <h2>Opening Payment App...</h2>
          <p>Please complete the payment in your UPI app</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-wrapper">

        {/* ── LEFT: Order Summary ── */}
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
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="total-row">
              <span>Delivery</span>
              <span className="free">FREE 🚚</span>
            </div>
            <div className="total-row total-row--grand">
              <strong>Grand Total</strong>
              <strong>₹{totalPrice}</strong>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Delivery + Payment ── */}
        <div className="checkout-form-panel">
          <h2>📦 Delivery Details</h2>
          <form onSubmit={handleOrder} className="checkout-form">

            <div className="form-group">
              <label>Full Address</label>
              <textarea
                placeholder="House No, Street, City, Pincode..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="form-group">
              <label>Payment Method</label>
              <div className="payment-options">

                {/* Cash on Delivery */}
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

                {/* UPI */}
                <label className={`payment-opt ${paymentMethod === "upi" ? "active" : ""}`}>
                  <input type="radio" value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")} />
                  <span className="pay-icon">📱</span>
                  <div>
                    <strong>UPI Payment</strong>
                    <small>PhonePe, Google Pay, Paytm, BHIM</small>
                  </div>
                </label>

                {/* UPI App Selector */}
                {paymentMethod === "upi" && (
                  <div className="upi-apps">
                    <p>Choose UPI App:</p>
                    <div className="upi-grid">
                      {[
                        { id: "phonepe", label: "PhonePe", emoji: "💜" },
                        { id: "googlepay", label: "GPay", emoji: "🔵" },
                        { id: "paytm", label: "Paytm", emoji: "🔷" },
                        { id: "bhim", label: "BHIM", emoji: "🇮🇳" },
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          className={`upi-app-btn ${upiOption === app.id ? "selected" : ""}`}
                          onClick={() => setUpiOption(app.id)}
                        >
                          <span>{app.emoji}</span>
                          <span>{app.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card */}
                <label className={`payment-opt ${paymentMethod === "card" ? "active" : ""}`}>
                  <input type="radio" value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")} />
                  <span className="pay-icon">💳</span>
                  <div>
                    <strong>Debit / Credit Card</strong>
                    <small>Coming soon</small>
                  </div>
                </label>

              </div>
            </div>

            <button type="submit" className="place-order-btn">
              {paymentMethod === "cod" && "✅ Place Order — ₹" + totalPrice}
              {paymentMethod === "upi" && "📱 Pay ₹" + totalPrice + " via " +
                (upiOption === "phonepe" ? "PhonePe" :
                 upiOption === "googlepay" ? "Google Pay" :
                 upiOption === "paytm" ? "Paytm" : "BHIM")}
              {paymentMethod === "card" && "💳 Pay ₹" + totalPrice + " via Card"}
            </button>

            <button type="button" className="back-link" onClick={() => navigate("/fruits")}>
              ← Back to Cart
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Checkout;