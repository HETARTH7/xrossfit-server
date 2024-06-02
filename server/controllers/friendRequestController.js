const FriendRequest = require("../models/friendRequestModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModels");

const fetchRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendRequest = async (req, res) => {
  try {
    const newRequest = new FriendRequest(req.body);
    await newRequest.save();
    res.status(200).json("Friend Request Sent");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await FriendRequest.findById(id);
    const sender = await User.findOne({ name: request.sender });
    const receiver = await User.findOne({ name: request.receiver });
    sender.friendsList.push(receiver.name);
    receiver.friendsList.push(sender.name);
    await sender.save();
    await receiver.save();
    await FriendRequest.findByIdAndDelete(id);
    const chat = new Chat({ user1: sender.name, user2: receiver.name });
    await chat.save();
    res.status(200).json("Friend Request Accepted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const declineRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await FriendRequest.findByIdAndDelete(id);
    res.status(200).json("Friend Request Declined");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { fetchRequests, sendRequest, acceptRequest, declineRequest };
