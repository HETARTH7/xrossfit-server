const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseLogSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: null,
  },
  sets: {
    type: Number,
    default: null,
  },
  repetitions: {
    type: Number,
    default: null,
  },
  caloricBurn: {
    type: Number,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
  date: {
    type: "String",
  },
});

const ExerciseLog = mongoose.model("ExerciseLog", exerciseLogSchema);

module.exports = ExerciseLog;
