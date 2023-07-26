const bcrypt = require("bcrypt");
const User = require("../model/User");

const RegisterUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(500)
        .json({ message: "An error occurred during registration." });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role: "user",
      refreshToken: "",
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during registration." });
  }
};

module.exports = { RegisterUser };
