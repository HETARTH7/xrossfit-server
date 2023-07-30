const {
  addToWishList,
  removeFromWishList,
  viewWishList,
} = require("../controllers/wishListController");

const router = require("express").Router();

router.get("/", viewWishList);
router.post("/", addToWishList);
router.delete("/", removeFromWishList);

module.exports = router;
