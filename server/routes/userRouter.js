const {
  loginUser,
  signupUser,
  getUsers,
  updateUser,
  getUser,
} = require("../controllers/userController");

const router = require("express").Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/login", loginUser);
router.post("/signup", signupUser);
router.put("/:id", updateUser);

module.exports = router;
