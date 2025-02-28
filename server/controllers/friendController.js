const Friend = require("../models/friendModel");
const User = require("../models/userModel");

const addFriend = async (req, res) => {
  try {
    const { friend1id, friend1username, friend2id, friend2username } = req.body;
    const friendRequest = new Friend({
      friend1id,
      friend1username,
      friend2id,
      friend2username,
    });
    await friendRequest.save();
    res
      .status(201)
      .json({ message: "Friend request sent to " + friend2username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFriendRequests = async (req, res) => {
  try {
    const { id } = req.params;
    const friendRequests = await Friend.find({ friend2id: id });
    res.status(200).json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { _id } = req.params;
    const friendRequest = await Friend.findById(_id);
    const { friend1id, friend1username, friend2id, friend2username } =
      friendRequest;

    await Friend.findByIdAndDelete(_id);
    await User.findByIdAndUpdate(friend1id, {
      $push: {
        friends: { friendID: friend2id, friendName: friend2username },
        following: { followingID: friend2id, followingName: friend2username },
        followers: { followerID: friend2id, followerName: friend2username },
      },
    });
    await User.findByIdAndUpdate(friend2id, {
      $push: {
        friends: { friendID: friend1id, friendName: friend1username },
        following: { followingID: friend1id, followingName: friend1username },
        followers: { followerID: friend1id, followerName: friend1username },
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
