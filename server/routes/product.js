const {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const router = require("express").Router();

router.get("/", getProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/", updateProduct);

module.exports = router;
