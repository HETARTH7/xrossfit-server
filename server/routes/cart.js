const {
  getCart,
  addItem,
  updateCart,
  deleteFromCart,
} = require("../controllers/cartController");

const router = require("express").Router();

router.get("/:user", getCart);
router.post("/", addItem);
router.put("/:id", updateCart);
router.delete("/:id", deleteFromCart);

module.exports = router;
