const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  friend1id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  friend1username: {
    type: String,
    required: true,
  },
  friend2id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  friend2username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Friend", friendSchema);
