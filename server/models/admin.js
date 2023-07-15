const mongoose = require("mongoose");

const adminSchema = {
  username: String,
  password: String,
};

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;
