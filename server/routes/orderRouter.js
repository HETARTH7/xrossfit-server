const { getOrders, placeOrder } = require("../controllers/orderController");

const router = require("express").Router();

router.post("/", placeOrder);
router.get("/:user", getOrders);

module.exports = router;
