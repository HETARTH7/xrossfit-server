const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.route("/:username").get((req, res) => {
  const username = req.params.username;
  User.find({ username: username })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(err));
});

router.route("/create").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const fname = "";
  const lname = "";
  const phno = "";
  const email = "";
  const addl1 = "";
  const addl2 = "";
  const city = "";
  const state = "";
  const pincode = "";
  const newUser = new User({
    username,
    password,
    fname,
    lname,
    phno,
    email,
    addl1,
    addl2,
    city,
    state,
    pincode,
  });
  User.find({ username: username }, function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result.length != 0) {
      res.status(200).send({ message: "Exists" });
    } else {
      res.status(200).send({ message: "OK" });
      newUser
        .save()
        .then()
        .catch((err) => res.status(400).json(`ERROR ${err}`));
    }
  });
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const phno = req.body.phno;
  const email = req.body.email;
  const addl1 = req.body.addone;
  const addl2 = req.body.addtwo;
  const city = req.body.city;
  const state = req.body.state;
  const pincode = req.body.pincode;
  console.log(username);
  User.updateOne(
    { username: username },
    {
      fname: fname,
      lname: lname,
      phno: phno,
      email: email,
      addl1: addl1,
      addl2: addl2,
      city: city,
      state: state,
      pincode: pincode,
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

router.route("/delete/:id").post((req, res) => {
  const deleteuserId = req.params.id;
  User.findByIdAndRemove(deleteuserId)
    .then(() => res.json("USER DELETED"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
