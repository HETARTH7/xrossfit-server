const {
  getExercises,
  getExerciseTypes,
  addExercise,
} = require("../controllers/exerciseController");

const router = require("express").Router();

router.get("/types", getExerciseTypes);
router.get("/:user", getExercises);
router.post("/add", addExercise);

module.exports = router;
