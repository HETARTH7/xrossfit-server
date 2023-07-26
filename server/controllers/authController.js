const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const Authenticate = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const accessToken = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1d",
    });
    user.refreshToken = refreshToken;
    user.save();
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const role = user.role;
    res.status(200).json({ accessToken, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

module.exports = { Authenticate };
