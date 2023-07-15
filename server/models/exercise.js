const mongoose = require("mongoose");

const exerciseSchema = {
  username: String,
  exerciseName: String,
  duration: String,
  date: Date,
};
const Exercise = new mongoose.model("Exercises", exerciseSchema);
module.exports = Exercise;
