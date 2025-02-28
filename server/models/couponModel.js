const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true },
  couponDescription: { type: String, required: true },
  discountType: {
    type: String,
    enum: ["Value", "Percentage"],
    required: true,
  },
  discount: { type: Number, required: true },
  validTill: { type: Date, required: true },
});

module.exports = mongoose.model("Coupon", couponSchema);
