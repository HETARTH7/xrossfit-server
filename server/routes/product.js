const { deleteModel } = require("mongoose");
const {
  getProduct,
  addProduct,
  updateRatings,
} = require("../controllers/productController");

const router = require("express").Router();

router.get("/", getProduct);
router.post("/", addProduct);
router.put("/:id", updateRatings);

module.exports = router;
