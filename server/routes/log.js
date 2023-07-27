const {
  getExercises,
  addExercise,
  deleteExercise,
} = require("../controllers/logController");

const router = require("express").Router();

router.get("/:username", getExercises);
router.post("/", addExercise);
router.delete("/:id", deleteExercise);

module.exports = router;
