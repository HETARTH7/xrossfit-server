const {
  loginUser,
  signupUser,
  getUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/signup", signupUser);

module.exports = router;
