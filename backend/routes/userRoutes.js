const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");

// ── Helper: hash password ──
const hashPassword = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

// ── 📝 Register ──
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered!" });

    const hashedPassword = hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed." });
  }
});

// ── 🔐 User Login ──
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = hashPassword(password);
    const user = await User.findOne({ email, password: hashedPassword });

    // Also check plain password for existing users
    if (!user) {
      const userPlain = await User.findOne({ email, password });
      if (!userPlain) {
        return res.status(401).json({ error: "Invalid email or password!" });
      }
      return res.status(200).json({
        message: "Login successful!",
        user: { name: userPlain.name, email: userPlain.email }
      });
    }

    res.status(200).json({
      message: "Login successful!",
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed." });
  }
});

// ── 🔐 Admin Login (Secure - credentials from .env) ──
router.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

console.log(process.env.ADMIN_EMAIL);
console.log(process.env.ADMIN_PASSWORD);

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ error: "Admin credentials not configured!" });
  }

  if (email === adminEmail && password === adminPassword) {
    console.log("✅ Admin login successful");
    res.status(200).json({ success: true, message: "Admin login successful!" });
  } else {
    console.log("❌ Admin login failed attempt");
    res.status(401).json({ error: "Invalid admin credentials!" });
  }
});

module.exports = router;