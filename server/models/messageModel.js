const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chat",
  },
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  senderName: { type: String, required: true },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
