const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
  stockAvailability: {
    type: Number,
    default: 0,
  },
  productImage: {
    type: String,
    default: null,
  },
  averageUserRating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [{ user: String, content: String, rating: Number }],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
