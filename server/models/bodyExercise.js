const mongoose = require("mongoose");

const bodyExerciseSchema = {
  part: String,
  name: String,
};
const BodyExercise = new mongoose.model("BodyExercise", bodyExerciseSchema);
module.exports = BodyExercise;
