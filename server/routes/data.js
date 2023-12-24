const express = require("express");
const { getData } = require("../controllers/dataController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);
router.get("/:email", getData);

module.exports = router;
