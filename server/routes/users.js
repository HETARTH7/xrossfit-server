const { getUsers, deleteUser } = require("../controllers/usersController");
const verifyJWT = require("../middleware/verifyJWT");

const router = require("express").Router();

router.get("/", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;
