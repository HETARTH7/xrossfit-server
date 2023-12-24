const ExerciseLog = require("../models/exerciseLogModel");
const User = require("../models/userModel");

const getData = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.find({ email: email });
    const exerciseLog = await ExerciseLog.find({ user: email });
    res.status(200).json({ user, exerciseLog });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getData };
