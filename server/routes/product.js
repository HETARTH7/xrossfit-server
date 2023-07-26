const {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const router = require("express").Router();

router.get("/", getProduct);
router.post("/add", addProduct);
router.post("/delete/:id", deleteProduct);
router.post("/update", updateProduct);

module.exports = router;
