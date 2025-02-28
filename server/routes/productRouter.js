const {
  addProduct,
  getProducts,
  updateProduct,
  getProductById,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/add", addProduct);
router.get("/:_id", getProductById);
router.get("/", getProducts);
router.put("/update/:_id", updateProduct);

module.exports = router;
