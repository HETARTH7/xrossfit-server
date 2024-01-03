const FriendRequest = require("../models/friendRequestModel");

const getRequests = async (req, res) => {};

const request = async (req, res) => {
  try {
    const { sender, reciever } = req.body;
    const newReq = new FriendRequest({ sender:sender, receiver:reciever });
    await newReq.save();

    res.status(200).json({ message: "Request sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptRequest = async (req, res) => {};

const rejectRequest = async (req, res) => {};

module.exports = { getRequests, request, acceptRequest, rejectRequest };
