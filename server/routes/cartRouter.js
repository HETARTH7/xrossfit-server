const {
  addToCart,
  removeItemFromCart,
  getCart,
  incrementItemQuantityInCart,
  decrementItemQuantityInCart,
} = require("../controllers/cartController");

const router = require("express").Router();

router.post("/add", addToCart);
router.delete("/:_id", removeItemFromCart);
router.put("/inc/:_id", incrementItemQuantityInCart);
router.put("/dec/:_id", decrementItemQuantityInCart);
router.get("/:user", getCart);

module.exports = router;
