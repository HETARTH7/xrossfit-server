const {
  createUser,
  loginUser,
  refreshToken,
  isEmailPresent,
  forgotPassword,
  getFriends,
  getChats,
  getUserProfile,
  getFollowings,
  getUsers,
  updatePhoneNumber,
  addAddress,
  deleteAddress,
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
router.put("/profile/update/phone/:_id", updatePhoneNumber);
router.post("/profile/add/address/:_id", addAddress);
router.put("/profile/delete/address/:id", deleteAddress);
router.get("/search", getUsers);

module.exports = router;
