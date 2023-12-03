const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Declined"],
    default: "Pending",
  },
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

module.exports = FriendRequest;
