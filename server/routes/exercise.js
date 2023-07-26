const { getExercise } = require("../controllers/exerciseController");

const router = require("express").Router();

router.get("/", getExercise);
