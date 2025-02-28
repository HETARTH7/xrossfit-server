const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  password: { type: String, required: true },
  phone: { type: String, default: "" },
  role: { type: String, enum: ["user", "admin"] },
  address: { type: String, default: "" },
  profileImgUrl: { type: String, default: "" },
  friends: {
    type: [
      {
        friendID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        friendName: { type: String },
      },
    ],
    ref: "User",
    default: [],
  },
  chats: {
    type: [
      {
        chatID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        chatName: { type: String },
      },
    ],
    ref: "User",
    default: [],
  },
  following: {
    type: [
      {
        followingID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        followingName: { type: String },
      },
    ],
    ref: "User",
    default: [],
  },
  followers: {
    type: [
      {
        followerID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        followerName: { type: String },
      },
    ],
    ref: "User",
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
