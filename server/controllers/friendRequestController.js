const FriendRequest = require("../models/friendRequestModel");
const User = require("../models/userModel");

const addFriend = async (req, res) => {
  try {
    const { sender, receiver } = req.body;
    const newRequest = new FriendRequest({
      sender,
      receiver,
    });
    await newRequest.save();
    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const { sender, receiver } = req.body;

    const receiverData = await User.findOne({ name: receiver });
    const senderData = await User.findOne({ name: sender });

    if (!receiverData) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    if (!senderData) {
      return res.status(404).json({ message: "Sender not found" });
    }

    if (!receiverData.friendsList || !Array.isArray(receiverData.friendsList)) {
      receiverData.friendsList = [sender];
    } else {
      receiverData.friendsList.push(sender);
    }

    if (!senderData.friendsList || !Array.isArray(senderData.friendsList)) {
      senderData.friendsList = [receiver];
    } else {
      senderData.friendsList.push(receiver);
    }

    await Promise.all([
      receiverData.save(),
      senderData.save(),
      FriendRequest.findByIdAndDelete(id),
    ]);
    res.status(200).json({ message: "Request accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const declineFriend = async (req, res) => {
  try {
    const { id } = req.params;
    await FriendRequest.findByIdAndDelete(id);
    res.status(200).json({ message: "Request declined" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFriend, acceptFriend, declineFriend };
