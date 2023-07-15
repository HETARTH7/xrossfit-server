const router = require("express").Router();
const BodyExercise = require("../models/bodyExercise");

router.route("/:part").get((req, res) => {
  const part = req.params.part;
  if (part=="All") {
    BodyExercise.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  } else {
    BodyExercise.find({ part: part })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  }
});
module.exports = router;
