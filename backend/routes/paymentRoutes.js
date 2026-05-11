const express = require("express");
const router = express.Router();
const crypto = require("crypto");

// ── Create Order (simplified - skip Razorpay order API) ──
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  console.log("💳 Payment request for amount: ₹" + amount);
  // Directly return amount without calling Razorpay orders API
  res.status(200).json({
    orderId: null,
    amount: Math.round(amount * 100), // convert to paise
  });
});

// ── Verify Payment ──
router.post("/verify", (req, res) => {
  const { razorpay_payment_id } = req.body;
  console.log("🔍 Payment received:", razorpay_payment_id);
  // Accept all payments in test mode
  res.status(200).json({ success: true, message: "Payment accepted!" });
});

module.exports = router;