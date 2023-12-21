const requireAuth = require("../middleware/requireAuth");
const {
  addLog,
  getLogs,
  deleteLog,
} = require("../controllers/exerciseLogController");
const router = require("express").Router();

router.use(requireAuth);
router.post("/", addLog);
router.get("/:user", getLogs);
router.delete("/:id", deleteLog);

module.exports = router;
