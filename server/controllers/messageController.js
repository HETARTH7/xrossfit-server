const Chat = require("../models/chatModels");
const Message = require("../models/messageModel");

const getChatId = async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    let chatId = await Chat.findOne({ user1, user2 });
    if (!chatId) {
      chatId = await Chat.findOne({ user1: user2, user2: user1 });
    }
    res.status(200).json(chatId._id);
  } catch (error) {
    res.status(500).json({ messages: error.message });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ messages: error.message });
  }
};

const sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(200).json("Message sent");
  } catch (error) {
    res.status(500).json({ messages: error.message });
  }
};

module.exports = { getChatId, fetchMessages, sendMessage };
