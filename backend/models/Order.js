const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // cod or online
  paymentId: { type: String, default: "" }, // Razorpay payment ID
  status: { type: String, default: "Pending" }, // Pending, Delivered
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);