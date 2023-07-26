const { getCart, addItem, updateCart } = require("../controllers/cartRouter");

const router = require("express").Router();

router.get("/:user", getCart);
router.post("/", addItem);
router.post("/update", updateCart);
