const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ── Place Order ──
router.post("/place-order", async (req, res) => {
  const { customerName, phone, address, items, totalPrice, paymentMethod, paymentId } = req.body;
  try {
    const newOrder = new Order({
      customerName, phone, address, items,
      totalPrice, paymentMethod,
      paymentId: paymentId || "",
      status: "Pending",
    });
    await newOrder.save();
    console.log("✅ New order saved:", newOrder._id);
    res.status(201).json({ message: "Order placed successfully!", orderId: newOrder._id });
  } catch (err) {
    console.error("❌ Order save failed:", err.message);
    res.status(500).json({ error: "Failed to place order." });
  }
});

// ── Get All Orders (Admin) ──
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// ── Get Orders by Phone ──
router.get("/my-orders/:phone", async (req, res) => {
  try {
    const orders = await Order.find({ 
      phone: req.params.phone 
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// ── Get Orders by Name (fallback) ──
router.get("/by-name/:name", async (req, res) => {
  try {
    const orders = await Order.find({
      customerName: { $regex: req.params.name, $options: "i" }
    }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// ── Update Order Status (Admin) ──
router.put("/:id/status", async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json({ message: "Status updated!", order: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status." });
  }
});

module.exports = router;