import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://harvesthub-backend-xh5u.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userPhone", phone);
        alert("✅ Welcome, " + data.user.name + "!");
        navigate("/fruits");
      } else {
        alert("❌ " + data.error);
      }
    } catch (err) {
      alert("❌ Cannot connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" placeholder="Enter your email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" placeholder="Enter your password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Phone Number</label>
        <input type="tel" placeholder="+91 98765 43210"
          value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <input type="submit"
          value={loading ? "Logging in..." : "Login"}
          disabled={loading} />
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
      <p style={{ marginTop: "10px" }}>
        <a href="/my-orders" style={{ color: "#2e7d32", fontWeight: "600" }}>
          📜 View My Orders
        </a>
      </p>
    </div>
  );
}

export default Login;