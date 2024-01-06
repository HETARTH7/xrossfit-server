const {
  addFriend,
  declineFriend,
  acceptFriend,
} = require("../controllers/friendRequestController");

const router = require("express").Router();

router.post("/", addFriend);
router.delete("/accept/:id", acceptFriend);
router.delete("/decline/:id", declineFriend);

module.exports = router;
