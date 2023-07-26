const { Authenticate } = require("../controllers/authController");
const router = require("express").Router();

router.post("/", Authenticate);

module.exports = router;
