// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Import Routes
const fruitRoutes = require("./routes/fruitRoutes");

const app = express();

// ================= Middleware =================
app.use(cors());
app.use(express.json());

// ================= MongoDB Connection =================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
})
.catch((error) => {
  console.error("❌ MongoDB Connection Error:", error);
});

// ================= Routes =================
app.use("/api/fruits", fruitRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("🍎 Fruit Ordering System Backend is Running");
});

// ================= Start Server =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});