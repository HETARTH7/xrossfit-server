const Exercise = require("../model/Exercise");

const getExercise = (req, res) => {
  const part = req.params.part;
  if (part == "All") {
    Exercise.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  } else {
    Exercise.find({ part: part })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  }
};
module.exports = { getExercise };
