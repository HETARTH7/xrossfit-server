const { startChat, updateChatName } = require("../controllers/chatController");

const router = require("express").Router();

router.post("/start", startChat);
router.put("/update-name", updateChatName);

module.exports = router;
