const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { addLog } = require("../controllers/exerciseLogController");
const router = express.Router();

router.use(requireAuth);
router.post("/", addLog);

module.exports = router;
