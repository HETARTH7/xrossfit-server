const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  sender: { type: String },
  receiver: { type: String },
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;
