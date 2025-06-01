const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String, required: true },
  phone: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"] },
  addresses: {
    type: [{ name: { type: String }, location: { type: String } }],
    default: [],
  },
  profileImgUrl: { type: String, default: "" },
  friends: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    ref: "User",
    default: [],
  },
  chats: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    ref: "User",
    default: [],
  },
  following: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ref: "User",
    default: [],
  },
  followers: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ref: "User",
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
