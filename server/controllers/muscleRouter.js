const Muscle = require("../model/Muscle");

const getMuscle = (req, res) => {
  Muscle.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
};

module.exports = { getMuscle };
