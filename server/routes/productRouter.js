const {
  getProduct,
  addProduct,
  updateRatings,
} = require("../controllers/productController");

const requireAuth = require("../middleware/requireAuth");
const router = require("express").Router();

// router.use(requireAuth);

router.get("/", getProduct);
router.post("/", addProduct);
router.put("/:id", updateRatings);

module.exports = router;
