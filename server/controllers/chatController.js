const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const startChat = async (req, res) => {
  try {
    const { isGroup, name, members } = req.body;
    if (isGroup && !name) {
      const noGroupNameError = new Error("Group name is required");
      noGroupNameError.name = "NoGroupNameError";
      throw noGroupNameError;
    }
    if (members.length < 2) {
      const insfficientMembersError = new Error(
        "At least two members are required"
      );
      insfficientMembersError.name = "InsufficientMembersError";
      throw insfficientMembersError;
    }
    if (!isGroup) {
      const memberIDs = members.map((member) => member.memberID);
      const existingChat = await Chat.findOne({
        isGroup: false,
        "members.memberID": { $all: memberIDs },
        $expr: { $eq: [{ $size: "$members" }, 2] },
      });

      if (existingChat) {
        return res.status(200).json({ chatID: existingChat._id });
      }
    }
    const newChat = new Chat({ isGroup, name, members });
    await newChat.save();
    const newChatID = newChat._id;
    var idx = 0;
    for (let member of members) {
      const chatName = isGroup ? name : members[(idx + 1) % 2].memberName;
      idx++;
      await User.findByIdAndUpdate(member.memberID, {
        $push: { chats: { chatID: newChatID, chatName: chatName } },
      });
    }
    res.status(201).json({ chatID: newChatID });
  } catch (error) {
    if (error.name === "NoGroupNameError")
      return res.status(400).json({ message: error.message });
    if (error.name === "InsufficientMembersError")
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const updateChatName = async (req, res) => {
  try {
    const { chatID, name } = req.body;
    if (!name) {
      const noChatNameError = new Error("Chat name is required");
      noChatNameError.name = "NoChatNameError";
      throw noChatNameError;
    }
    await Chat.findByIdAndUpdate(chatID, { name });
    res.status(200).json({ message: "Chat name updated" });
  } catch (error) {
    if (error.name === "NoChatNameError")
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

module.exports = { startChat, updateChatName };
