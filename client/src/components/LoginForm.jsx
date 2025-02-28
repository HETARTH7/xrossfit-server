"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import axios from "@/api/axios";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/utils/useAuthContext";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      const json = await response.data;
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      json.role === "user" ? router.push("/home") : router.push("/admin");
    } catch (error) {
      if (error.response.data) toast.error(error.response.data.message);
      else toast.error(error.message);
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
        height: "97vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={login}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "white",
          width: 300,
        }}
      >
        <ToastContainer />
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Link
            href="/signup"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Create a new account
          </Link>
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Link
            href="/forgot-password"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Forgot Password?
          </Link>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          loading={loading}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
