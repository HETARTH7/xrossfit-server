const ExerciseLog = require("../models/exerciseLogModel");

const date = new Date();
const today = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const addLog = async (req, res) => {
  try {
    const { user, exerciseLog } = req.body;
    const newLog = ExerciseLog({
      user,
      ...exerciseLog,
      date: today + " " + months[parseInt(month)] + " " + year,
    });
    newLog.save();

    res.status(200).json("Exercise Added Successfully");
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
    res.status(200).json("Log Deleted Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addLog, getLogs, deleteLog };
