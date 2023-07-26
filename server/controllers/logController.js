const Log = require("../model/Log");

const getExercises = (req, res) => {
  const username = req.params.name;
  Log.find({ username: username })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

const addExercise = (req, res) => {
  const username = req.body.username;
  const exerciseName = req.body.exerciseName;
  const duration = req.body.duration;
  const date = req.body.date;
  const exercise = new Log({ username, exerciseName, duration, date });
  exercise
    .save()
    .then(() => res.json("EXERCISE ADDED"))
    .catch((err) => res.status(400).json(`ERROR ${err}`));
};

const deleteExercise = (req, res) => {
  const deleteExercise = req.params.id;
  Log.findByIdAndRemove(deleteExercise)
    .then(() => res.json("EXERCISE DELETED"))
    .catch((err) => res.status(400).json("Error: " + err));
};

module.exports = { getExercises, addExercise, deleteExercise };
