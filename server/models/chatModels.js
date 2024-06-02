const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user1: { type: String },
  user2: { type: String },
});

const Chat = new mongoose.model("Chat", chatSchema);

module.exports = Chat;
