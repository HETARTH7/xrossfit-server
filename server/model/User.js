const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  refreshToken: String,
  fname: String,
  lname: String,
  phno: Number,
  email: String,
  address: String,
});

module.exports = mongoose.model("User", userSchema);
