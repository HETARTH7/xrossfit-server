const {
  addToCart,
  getCart,
  removeProductFromCart,
  completeOrder,
  placeOrder,
  getOrders,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/", addToCart);
router.get("/cart/:user", getCart);
router.get("/", getOrders);
router.get("/:user", getOrders);
router.delete("/:orderId/:productId", removeProductFromCart);
router.put("/complete/:orderId", completeOrder);
router.put("/place/:orderId", placeOrder);

module.exports = router;
