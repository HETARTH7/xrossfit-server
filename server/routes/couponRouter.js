const { createCoupon, getCoupons } = require("../controllers/couponController");

const router = require("express").Router();

router.post("/create", createCoupon);
router.get("/", getCoupons);

module.exports = router;
