import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === "admin@farmer.com" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      setTimeout(() => {
        setLoading(false);
        navigate("/admin/dashboard");
      }, 800);
    } else {
      setLoading(false);
      alert("❌ Invalid admin credentials!");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <span className="admin-login-icon">🌾</span>
        <h2>Admin Login</h2>
        <p className="subtitle">HarvestHub Farm Management</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;