const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Active", "Completed"],
    default: "Active",
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
