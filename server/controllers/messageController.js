const Message = require("../models/messageModel");

const sendMessage = async (req, res) => {
  try {
    const { chatID, senderID, senderName, message } = req.body;
    const newMessage = new Message({
      chatID,
      senderID,
      senderName,
      message,
      time: new Date(),
    });
    await newMessage.save();
    res.status(201).json({ message: newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { chatID } = req.params;
    const messages = await Message.find({ chatID });
    res
      .status(200)
      .json({ message: "Messages fetched for chatID: " + chatID, messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { messageID } = req.params;
    await Message.findByIdAndUpdate(messageID, { message: req.body.message });
    res.status(200).json({ message: "Message updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const { messageID } = req.params;
    await Message.findByIdAndDelete(messageID);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { sendMessage, getMessages, updateMessage, deleteMessage };
