const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String },
    receiver: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
