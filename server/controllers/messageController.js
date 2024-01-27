const Message = require("../models/messageModel");

const fetchMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.get({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ messages: error.message });
  }
};
