const mongoose = require("mongoose");

const orderSchema = {
  user: String,
  name: String,
  quantity: Number,
  price: Number,
  status: String,
};

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
