const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  effectivePrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  address: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Placed", "Delivered", "Cancelled"],
    default: "Placed",
  },
});

module.exports = mongoose.model("Order", orderSchema);
