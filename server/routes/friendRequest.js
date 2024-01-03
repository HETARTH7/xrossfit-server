const {
  request,
  getRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/friendRequestController");
const requireAuth = require("../middleware/requireAuth");
const router = require("express").Router();

// router.use(requireAuth);

router.get("/", getRequests);
router.post("/", request);
router.put("/", acceptRequest);
router.delete("/", rejectRequest);

module.exports = router;
