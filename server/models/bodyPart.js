const mongoose = require("mongoose");

const bodyPartSchema = {
  name: String,
};
const BodyPart = new mongoose.model("BodyPart", bodyPartSchema);
module.exports = BodyPart;
