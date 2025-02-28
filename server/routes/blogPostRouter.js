const express = require("express");
const router = express.Router();
const {
  createPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getPosts,
} = require("../controllers/blogController");

router.get("/:userId", getPosts);
router.post("/", createPost);
router.delete("/:_id", deletePost);
router.put("/like/:_id/:userId", likePost);
router.put("/unlike/:_id/:userId", unlikePost);
router.post("/comments/:_id", addComment);

module.exports = router;
