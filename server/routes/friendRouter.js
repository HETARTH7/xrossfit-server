const {
  addFriend,
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest,
} = require("../controllers/friendController");

const router = require("express").Router();

router.post("/add", addFriend);
router.get("/requests/:id", getFriendRequests);
router.delete("/accept/:_id", acceptFriendRequest);
router.delete("/reject/:_id", rejectFriendRequest);

module.exports = router;
