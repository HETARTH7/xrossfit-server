const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (_id) => {
  const refreshToken = jwt.sign({ _id }, process.env.JWT_SECRET_REFRESH, {
    expiresIn: "3d",
  });
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return { token, refreshToken };
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const setCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken);
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userRole = role || "user";
    if (!name || !email || !password) {
      const fieldValidationError = new Error("All fields must be filled");
      fieldValidationError.name = "FieldValidationError";
      throw fieldValidationError;
    }
    if (!validator.isEmail(email)) {
      const emailValidationError = new Error("Email not valid");
      emailValidationError.name = "EmailValidationError";
      throw emailValidationError;
    }
    if (await User.findOne({ email })) {
      const emailAlreadyExistsError = new Error(
        "Email already register with another account. Please try logging in or use another email id."
      );
      emailAlreadyExistsError.name = "EmailAlreadyExistsError";
      throw emailAlreadyExistsError;
    }
    if (!validator.isStrongPassword(password)) {
      const passwordNotStrongError = new Error("Password not strong enough");
      passwordNotStrongError.name = "PasswordNotStrongError";
      throw passwordNotStrongError;
    }

    hash = await hashPassword(password);

    const user = await User.create({
      email,
      password: hash,
      name,
      role: userRole,
    });
    const { token, refreshToken } = createToken(user._id);
    setCookie(res, refreshToken);
    res.status(200).json({
      message: "Sign-up Successfull!",
      token: token,
      name: user.name,
      userId: user._id,
    });
  } catch (error) {
    if (
      error.name === "FieldValidationError" ||
      error.name === "EmailValidationError" ||
      error.name === "EmailAlreadyExistsError" ||
      error.name === "PasswordNotStrongError"
    )
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const fieldValidationError = new Error("All fields must be filled");
      fieldValidationError.name = "FieldValidationError";
      throw fieldValidationError;
    }

    const user = await User.findOne({ email });

    if (!user) {
      const userNotFoundError = new Error("User not found");
      userNotFoundError.name = "UserNotFoundError";
      throw userNotFoundError;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const incorrectPasswordError = new Error("Incorrect password");
      incorrectPasswordError.name = "IncorrectPasswordError";
      throw incorrectPasswordError;
    }
    const { token, refreshToken } = createToken(user._id);
    setCookie(res, refreshToken);
    res.status(200).json({
      message: "Login Successfull!",
      token: token,
      name: user.name,
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    if (error.name === "FieldValidationError")
      return res.status(400).json({ message: error.message });
    if (error.name === "UserNotFoundError")
      return res.status(404).json({ message: error.message });
    if (error.name === "IncorrectPasswordError")
      return res.status(401).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const authToken = req.cookies;

    if (!authToken) {
      const noAuthTokenError = new Error("No Authorization token present");
      noAuthTokenError.name = "NoAuthTokenError";
      throw noAuthTokenError;
    }
    const { _id } = jwt.verify(
      authToken.refreshToken,
      process.env.JWT_SECRET_REFRESH
    );
    req.user = await User.findOne({ _id }).select("_id");
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .json({ message: "Refresh Token authenticated", token: token });
  } catch (error) {
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({ message: "Request is not authorized" });
    if (error.name === "NoAuthTokenError")
      return res.status(401).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const isEmailPresent = async (req, res) => {
  try {
    const user = await User.findOne(req.params);
    if (!user) {
      const userNotFoundError = new Error("User not found");
      userNotFoundError.name = "UserNotFoundError";
      throw userNotFoundError;
    }
    return res.status(200).json({ message: "User found", id: user._id });
  } catch (error) {
    if (error.name === "UserNotFoundError")
      return res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { id, password } = req.body;
  try {
    if (!password) {
      const passwordValidationError = new Error("Password cannot be empty");
      passwordValidationError.name = "PasswordValidationError";
      throw passwordValidationError;
    }
    if (!validator.isStrongPassword(password)) {
      const passwordNotStrongError = new Error("Password not strong enough");
      passwordNotStrongError.name = "PasswordValidationError";
      throw passwordNotStrongError;
    }
    hash = await hashPassword(password);
    await User.updateOne({ _id: id }, { password: hash });
    res.status(200).json({ message: "Password updated." });
  } catch (error) {
    if (error.name === "PasswordValidationError")
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const getFriends = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    const friends = user.friends;
    res.status(200).json(friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChats = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    const chats = user.chats;
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFollowings = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    const followings = user.following;
    res.status(200).json(followings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    const profile = {
      email: user.email,
      name: user.name,
      phone: user.phone,
      addresses: user.addresses,
      following: user.following,
      followers: user.followers,
    };
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePhoneNumber = async (req, res) => {
  try {
    const { _id } = req.params;
    const { phone } = req.body;
    await User.findByIdAndUpdate(_id, { phone });
    res.status(200).json({ message: "Profile Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, location } = req.body;
    await User.findByIdAndUpdate(_id, {
      $push: { addresses: { name, location } },
    });
    res.status(200).json({ message: "Profile Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { _id } = req.params;
    const { address } = req.body;
    await User.updateOne(
      {
        _id,
        "addresses.name": address.name,
        "addresses.location": address.location,
      },
      {
        $pull: {
          addresses: { name: address.name, location: address.location },
        },
      }
    );
    res.status(200).json({ message: "Address Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const userList = users.map((user) => ({
      id: user._id,
      name: user.name,
    }));
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  refreshToken,
  isEmailPresent,
  forgotPassword,
  getFriends,
  getChats,
  getFollowings,
  getUserProfile,
  updatePhoneNumber,
  addAddress,
  deleteAddress,
  getUsers,
};
