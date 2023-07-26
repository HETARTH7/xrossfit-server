const mongoose = require("mongoose");

const exerciseSchema = {
  part: String,
  name: String,
};
const Exercise = new mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
