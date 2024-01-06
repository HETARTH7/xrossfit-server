const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

module.exports = FriendRequest;
