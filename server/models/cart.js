const mongoose = require("mongoose");

const cartSchema = {
  user: String,
  name: String,
  quantity: Number,
  price: Number,
};

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;
