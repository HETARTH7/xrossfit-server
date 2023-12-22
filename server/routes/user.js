const {
  loginUser,
  signupUser,
  getUsers,
  getUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:email", getUser);
router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;
