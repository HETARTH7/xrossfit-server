const router = require("express").Router();
let Exercise = require("../models/exercise");

router.route("/:name").get((req, res) => {
  const username = req.params.name;
  Exercise.find({ username: username })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
module.exports = router;

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const exerciseName = req.body.exerciseName;
  const duration = req.body.duration;
  const date = req.body.date;
  const exercise = new Exercise({ username, exerciseName, duration, date });
  exercise
    .save()
    .then(() => res.json("EXERCISE ADDED"))
    .catch((err) => res.status(400).json(`ERROR ${err}`));
});

router.route("/delete/:id").post((req, res) => {
  const deleteExercise = req.params.id;
  Exercise.findByIdAndRemove(deleteExercise)
    .then(() => res.json("EXERCISE DELETED"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/deleteuser/:user").post((req, res) => {
  const deleteExercise = req.params.user;
  Exercise.deleteMany({ username: deleteExercise })
    .then(() => res.json("EXERCISE DELETED"))
    .catch((err) => res.status(400).json("Error: " + err));
});
