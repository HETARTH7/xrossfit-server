const {
  sendRequest,
  acceptRequest,
  declineRequest,
  fetchRequests,
} = require("../controllers/friendRequestController");

const router = require("express").Router();

// const requireAuth = require("../middleware/requireAuth");
// router.use(requireAuth);

router.get("/", fetchRequests);
router.post("/", sendRequest);
router.put("/:id", acceptRequest);
router.delete("/:id", declineRequest);

module.exports = router;
