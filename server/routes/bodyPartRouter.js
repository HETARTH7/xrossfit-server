const router = require("express").Router();
const BodyPart = require("../models/bodyPart");

router.route("/").get((req, res) => {
  BodyPart.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
