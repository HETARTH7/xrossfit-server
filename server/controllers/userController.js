const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "fuckyoubitch", { expiresIn: "3d" });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const { email } = req.params;
  try {
    const users = await User.find({ email: email });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const id = user._id;
    const name = user.name;
    const role = user.role;
    const address = user.address;
    const phone = user.phone;
    const age = user.age;
    const height = user.height;
    const weight = user.weight;
    const gender = user.gender;
    const fitnessLevel = user.fitnessLevel;
    const achievements = user.achievements;
    const friendsList = user.friendsList;
    const chatHistory = user.chatHistory;

    res.status(200).json({
      id,
      name,
      email,
      token,
      role,
      address,
      phone,
      age,
      height,
      weight,
      gender,
      fitnessLevel,
      achievements,
      friendsList,
      chatHistory,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ id, name, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, phone, age, height, weight, gender } = req.body;
    await User.updateOne(
      { _id: id },
      { $set: { address, phone, age, height, weight, gender } }
    );

    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getUsers, getUser, updateUser };
