const Friend = require("../models/friendModel");
const User = require("../models/userModel");
const { ObjectId } = require("mongodb");

const addFriend = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    const friendRequest = new Friend({
      user1,
      user2,
    });
    await friendRequest.save();
    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const { _id } = req.params;
    const friendRequests = await Friend.find({ user2: _id }).populate(
      "user1",
      "name"
    );
    res.status(200).json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { _id } = req.params;
    const friendRequest = await Friend.findById(_id);
    const { user1, user2 } = friendRequest;
    await Friend.findByIdAndDelete(_id);
    await User.findByIdAndUpdate(user1, {
      $push: {
        friends: user2,
        following: user2,
        followers: user2,
      },
    });
    await User.findByIdAndUpdate(user2, {
      $push: {
        friends: user1,
        following: user1,
        followers: user1,
      },
    });
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectFriendRequest = async (req, res) => {
  try {
    const { _id } = req.params;
    await Friend.findByIdAndDelete(_id);
    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addFriend,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest,
};
