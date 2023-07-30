const mongoose = require("mongoose");

const wishListSchema = {
  userID: String,
  productID: String,
};

const WishList = new mongoose.model("WishList", wishListSchema);

module.exports = WishList;
