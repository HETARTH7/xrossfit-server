const Log = require("../model/Log");

const getExercises = async (req, res) => {
  try {
    const username = req.params.username;
    const log = await Log.find({ username: username });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ message: "An error while fetching the logs." });
  }
};

const addExercise = (req, res) => {
  try {
    const { username, exercise, duration, date } = req.body;
    const newRecord = new Log({ username, exercise, duration, date });
    newRecord.save();
    res.status(200).json({ message: "Log updated" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured while updating the log" });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const deleteExercise = req.params.id;
    await Log.findByIdAndRemove(deleteExercise);
    res
      .status(200)
      .json({ message: "The record has been deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occured while deleting the log" });
  }
};

module.exports = { getExercises, addExercise, deleteExercise };
