const router = require("express").Router();
let User = require("../models/user");

router.route("/").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.find({ username: username, password: password }, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length != 0) {
      res.status(200).send({ message: "OK" });
    } else {
      res.status(200).send({ message: "Wrong" });
    }
  });
});

module.exports = router;
