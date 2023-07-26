const mongoose = require("mongoose");

const logSchema = {
  username: String,
  exerciseName: String,
  duration: String,
  date: Date,
};
const Log = new mongoose.model("Log", logSchema);
module.exports = Log;
