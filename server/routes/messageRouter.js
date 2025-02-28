const {
  getMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
} = require("../controllers/messageController");

const router = require("express").Router();

router.get("/:chatID", getMessages);
router.post("/send", sendMessage);
router.put("/update/:messageID", updateMessage);
router.delete("/delete/:messageID", deleteMessage);

module.exports = router;
