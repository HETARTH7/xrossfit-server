const mongoose = require("mongoose");

const stockSchema = {
  name: String,
  description: String,
  price: Number,
  quantity: Number,
};

const Stock = new mongoose.model("Stock", stockSchema);

module.exports = Stock;
