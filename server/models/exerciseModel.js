const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  muscleGroup: {
    type: String,
    required: true,
  },
  equipmentRequired: {
    type: String,
    default: null,
  },
  difficultyLevel: {
    type: String,
    enum: ["Easy", "Intermediate", "Advanced"],
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
  demonstrationVideos: {
    type: [String],
    default: [],
  },
  recommendedSets: {
    type: Number,
    default: null,
  },
  recommendedRepetitions: {
    type: Number,
    default: null,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
