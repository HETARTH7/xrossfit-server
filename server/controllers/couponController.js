const Coupon = require("../models/couponModel");

const createCoupon = async (req, res) => {
  try {
    const { couponCode, couponDescription, discountType, discount, validTill } =
      req.body;
    if (
      !couponCode ||
      !couponDescription ||
      !discountType ||
      !discount ||
      !validTill
    ) {
      const fieldValidationError = new Error("All fields are required");
      fieldValidationError.name = "FieldValidationError";
      throw fieldValidationError;
    }
    const exists = await Coupon.find({ couponCode });
    if (exists.length) {
      const couponCodeAlreadyExists = new Error(
        "This coupon code already exists. Please use a new code"
      );
      couponCodeAlreadyExists.name = "CouponCodeAlreadyExists";
      throw couponCodeAlreadyExists;
    }
    const newCoupon = new Coupon({
      couponCode,
      couponDescription,
      discountType,
      discount,
      validTill,
    });
    await newCoupon.save();
    res.status(201).json({ message: "New Coupon created sucessfully" });
  } catch (error) {
    if (
      error.name === "FieldValidationError" ||
      error.name === "CouponCodeAlreadyExists"
    )
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ validTill: { $gte: new Date() } });
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCoupon, getCoupons };
