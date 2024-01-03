const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

module.exports = FriendRequest;
