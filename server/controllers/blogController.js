const Post = require("../models/blogPostModel");
const User = require("../models/userModel");

const createPost = async (req, res) => {
  try {
    const { user, title, post } = req.body;
    if (!title || !post) {
      const fieldValidationError = new Error("All fields are required.");
      fieldValidationError.name = "ValidationError";
      throw fieldValidationError;
    }
    const newPost = new Post({ user, title, post });
    await newPost.save();
    res.status(200).json({ message: "New Post Created" });
  } catch (error) {
    if (error.name === "ValidationError")
      return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { _id } = req.params;
    await Post.findByIdAndDelete(_id);
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const { _id, userId } = req.params;
    await Post.findByIdAndUpdate(_id, { $push: { likes: userId } });
    res.status(200).json({ message: "Post Liked" });
  } catch (error) {
    z;
    res.status(500).json({ message: error.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const { _id, userId } = req.params;
    await Post.findByIdAndUpdate(_id, { $pull: { likes: userId } });
    res.status(200).json({ message: "Post Unliked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { _id } = req.params;
    const { userID, userName, comment } = req.body;
    await Post.findByIdAndUpdate(_id, {
      $push: { comments: { userID, userName, comment } },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const followings = user.following.map(
      (followedUser) => followedUser.followingID
    );
    const posts = await Post.find({ user: { $in: followings } }).populate(
      "user",
      "name"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  getPosts,
};
