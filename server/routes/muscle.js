const { getMuscle } = require("../controllers/muscleRouter");

const router = require("express").Router();

router.get("/", getMuscle);
