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
    const date = exerciseLog.date;

    const newLog = ExerciseLog({
      user,
      caloricBurn,
      duration,
      exerciseName,
      notes,
      repetitions,
      sets,
      date,
    });
    newLog.save();
    res.status(200).json("Exercise added");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLogs = async (req, res) => {
  try {
    const { user } = req.params;
    const exerciseLog = await ExerciseLog.find({ user });
    res.status(200).json(exerciseLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLog = async (req, res) => {
  try {
    const { id } = req.params;
    await ExerciseLog.findByIdAndDelete(id);
    res.status(200).json("Log Deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addLog, getLogs, deleteLog };
