const { RegisterUser } = require("../controllers/registerController");

const router = require("express").Router();

router.post("/", RegisterUser);

module.exports = router;
