const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  isGroup: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
  },
  members: {
    type: [
      {
        memberID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        memberName: { type: String },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
