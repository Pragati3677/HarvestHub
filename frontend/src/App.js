import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import FruitList from "./pages/FruitList";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";

import "./App.css";
import AdminApp from "./pages/admin/AdminApp"; // ✅ Correct path

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/fruits" element={<FruitList />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />

          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
