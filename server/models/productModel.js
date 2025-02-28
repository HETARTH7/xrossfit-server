const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  discountType: {
    type: String,
    enum: ["No", "Value", "Percentage"],
    default: "No",
  },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  imageURL: { type: String, required: true },
  category: { type: String, enum: [], required: true },
  reviews: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        review: { type: String, required: true },
        rating: { type: Number, required: true },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Product", productSchema);
