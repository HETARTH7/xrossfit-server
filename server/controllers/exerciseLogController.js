const ExerciseLog = require("../models/exerciseLogModel");

const addLog = async (req, res) => {
  try {
    const { user, exerciseLog } = req.body;
    const caloricBurn = exerciseLog.caloricBurn;
    const duration = exerciseLog.duration;
    const exerciseName = exerciseLog.exerciseName;
    const notes = exerciseLog.notes;
    const repetitions = exerciseLog.repetitions;
    const sets = exerciseLog.sets;

    const newLog = ExerciseLog({
      user,
      caloricBurn,
      duration,
      exerciseName,
      notes,
      repetitions,
      sets,
    });
    newLog.save();
    res.status(200).json("Exercise added");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addLog };
