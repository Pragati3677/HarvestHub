import React from "react";
import { useNavigate } from "react-router-dom";
import './Register.css'; // This will add page-specific styling

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registered successfully! Please login.");
    navigate("/login");
  };

  return (
    <div className="page-container">
      <form onSubmit={handleRegister} className="form-box">
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
