const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  post: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  comments: {
    type: [
      {
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        userName: { type: String },
        time: { type: Date, default: Date.now },
        comment: { type: String },
      },
    ],
    default: [],
  },
  status: { type: String, enum: ["Draft", "Posted", "Deleted"] },
});

module.exports = mongoose.model("Post", blogPostSchema);
