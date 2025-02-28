"use client";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [foundUser, setFoundUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const searchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/user/is-user/${email}`);
      const json = await response.data;
      setUserId(json.id);
      toast.success(json.message);
      setFoundUser(true);
    } catch (error) {
      if (error.response?.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    setLoading(true);
    try {
      const response = await axios.put("/user/forgot-password", {
        id: userId,
        password: newPassword,
      });
      const json = await response.data;
      toast.success(json.message);
      router.push("/login");
    } catch (error) {
      if (error.response?.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          width: 300,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Forgot Password
        </Typography>
        {!foundUser ? (
          <>
            <TextField
              label="Enter your email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={searchUser}
              disabled={loading}
              loading={loading}
            >
              Search
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Enter your email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              disabled
              // required
            />
            <TextField
              label="Enter new password"
              type="password"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              onClick={changePassword}
              disabled={loading}
              loading={loading}
            >
              Change Password
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ForgotPasswordForm;
