const mongoose = require("mongoose");

const userSchema = {
  username: String,
  password: String,
  fname: String,
  lname: String,
  phno: Number,
  email: String,
  addl1: String,
  addl2: String,
  city: String,
  state: String,
  pincode: String,
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
