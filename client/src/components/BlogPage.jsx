"use client";
import { useAuthContext } from "@/utils/useAuthContext";
import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast, ToastContainer } from "react-toastify";
import { ToastError } from "@/utils/toast-error";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import Navbar from "./Navbar";

const BlogPage = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/post/${user.userId}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPosts(response.data);
      } catch (error) {
        ToastError(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) getPosts();
  }, [user]);

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/post",
        { user: user.userId, title, post },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      toast.success(response.data.message);
      setOpen(false);
      setTitle("");
      setPost("");
    } catch (error) {
      ToastError(error);
    }
  };

  const refreshPosts = async () => {
    try {
      const response = await axios.get(`/post/${user.userId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPosts(response.data);
    } catch (error) {
      ToastError(error);
    }
  };

  const handleLike = async (postId, isLike) => {
    try {
      await axios.put(
        `/post/${isLike ? "like" : "unlike"}/${postId}/${user.userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      refreshPosts();
    } catch (error) {
      ToastError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ToastContainer />

      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Create Post
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((postItem) => (
              <Card key={postItem._id} className="shadow-lg rounded-lg">
                <CardContent>
                  <Typography variant="h6" className="font-bold">
                    {postItem.title}
                  </Typography>
                  <Typography variant="body1" className="my-2">
                    {postItem.post}
                  </Typography>
                  <div className="flex justify-end">
                    <IconButton
                      onClick={() =>
                        handleLike(
                          postItem._id,
                          !postItem.likes.includes(user.userId)
                        )
                      }
                      color={
                        postItem.likes.includes(user.userId) ? "primary" : ""
                      }
                    >
                      <ThumbUp />
                    </IconButton>
                    <span className="ml-2 text-gray-600">
                      {postItem.likes?.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <form onSubmit={createPost} className="flex flex-col gap-4">
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              fullWidth
              multiline
              rows={4}
              required
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPage;
