const {
  getExercises,
  addExercise,
  deleteExercise,
} = require("../controllers/logController");

const router = require("express").Router();

router.get("/:user", getExercises);
router.post("/", addExercise);
router.delete("/", deleteExercise);

module.exports = router;
