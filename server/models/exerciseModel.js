const mongoose = require("mongoose");

const ExerciseType = {
  BICEP: "BICEP",
  TRICEP: "TRICEP",
  CHEST: "CHEST",
  BACK: "BACK",
  LEGS: "LEGS",
  SHOULDERS: "SHOULDERS",
  CARDIO: "CARDIO",
  CORE: "CORE",
  YOGA: "YOGA",
  STRETCHING: "STRETCHING",
};

const exerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true },
  sets: { type: Number, required: true },
  type: { type: String, enum: Object.values(ExerciseType), required: true },
  date: { type: Date, required: true },
  note: { type: String },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
