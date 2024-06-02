const {
  fetchMessages,
  sendMessage,
  getChatId,
} = require("../controllers/messageController");

const router = require("express").Router();

router.post("/id", getChatId);
router.get("/", fetchMessages);
router.post("/", sendMessage);

module.exports = router;
