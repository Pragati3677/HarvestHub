import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Verify admin credentials via backend (secure)
      const res = await fetch("https://harvesthub-backend-xh5u.onrender.com/api/users/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("isAdminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        alert("❌ " + (data.error || "Invalid admin credentials!"));
      }
    } catch (err) {
      alert("❌ Cannot connect to server. Is backend running?");
    }

    setLoading(false);
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