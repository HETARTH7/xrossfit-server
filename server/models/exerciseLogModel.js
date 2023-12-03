const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exerciseName: {
    type: String,
    required: true,
  },
  dateAndTime: {
    type: Date,
    default: Date.now,
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
  weight: {
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
});

const ExerciseLog = mongoose.model("ExerciseLog", exerciseLogSchema);

module.exports = ExerciseLog;
