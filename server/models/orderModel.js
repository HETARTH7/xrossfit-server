const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "In Cart",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
