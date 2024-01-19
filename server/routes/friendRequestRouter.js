const {
  sendRequest,
  acceptRequest,
  declineRequest,
  fetchRequests,
} = require("../controllers/friendRequestController");

const router = require("express").Router();

router.get("/", fetchRequests);
router.post("/", sendRequest);
router.put("/:id", acceptRequest);
router.delete("/:id", declineRequest);

module.exports = router;
