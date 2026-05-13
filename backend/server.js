
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const fruitRoutes = require("./routes/fruitRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// NEW ROUTES
const feedbackRoutes = require("./routes/feedbackRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug Razorpay Keys
console.log(
  "🔑 RAZORPAY_KEY_ID:",
  process.env.RAZORPAY_KEY_ID ? "✅ Loaded" : "❌ NOT FOUND"
);

console.log(
  "🔑 RAZORPAY_KEY_SECRET:",
  process.env.RAZORPAY_KEY_SECRET ? "✅ Loaded" : "❌ NOT FOUND"
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((error) =>
    console.error("❌ MongoDB Connection Error:", error)
  );

// Routes
app.use("/api/fruits", fruitRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

// NEW ROUTES
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/orders", orderRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🌾 HarvestHub Backend Running");
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});