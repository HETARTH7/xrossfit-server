const {
  createUser,
  loginUser,
  refreshToken,
  isEmailPresent,
  forgotPassword,
  getFriends,
  getChats,
  getUserProfile,
  updateUserProfile,
  getFollowings,
  getUsers,
} = require("../controllers/userContoller");
const router = require("express").Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/refresh", refreshToken);
router.get("/is-user/:email", isEmailPresent);
router.put("/forgot-password", forgotPassword);
router.get("/friends/:_id", getFriends);
router.get("/chats/:_id", getChats);
router.get("/followings/:_id", getFollowings);
router.get("/profile/:_id", getUserProfile);
router.put("/profile/update/:_id", updateUserProfile);
router.get("/search", getUsers);

module.exports = router;
