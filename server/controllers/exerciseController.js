const Exercise = require("../models/exerciseModel");

const addExercise = async (req, res) => {
  try {
    const { user, name, duration, calories, sets, type, note } = req.body;

    if (!user || !name || !duration || !calories || !sets || !type) {
      const e = new Error("All fields are required.");
      e.name = "ValidationError";
      throw e;
    }
    const date = new Date();
    const newExercise = new Exercise({
      user,
      name,
      duration,
      calories,
      sets,
      type,
      date,
      note,
    });
    await newExercise.save();
    res.status(201).json({ message: "Exerices added successfully" });
  } catch (error) {
    if (error.name === "ValidationError")
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const getExercises = async (req, res) => {
  try {
    const { user } = req.params;
    const exercises = await Exercise.find({ user });
    res.status(200).json({ message: "Exercises fetched", exercises });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExerciseTypes = async (req, res) => {
  try {
    const exerciseTypes = Exercise.schema.path("type").enumValues;
    res.status(200).json({ message: "Exercise types fetched", exerciseTypes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addExercise, getExercises, getExerciseTypes };
