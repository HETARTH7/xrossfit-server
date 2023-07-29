const User = require("../model/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot get the users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    await User.findByIdAndRemove(id);
    res.status(200).json({ message: "User deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ message: "There was an error in delete this user" });
  }
};

module.exports = { getUsers, deleteUser };
