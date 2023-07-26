const mongoose = require("mongoose");

const muscleSchema = {
  name: String,
};
const Muscle = new mongoose.model("BodyPart", muscleSchema);
module.exports = Muscle;
