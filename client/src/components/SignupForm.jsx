"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "@/api/axios";
import { toast, ToastContainer } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { useAuthContext } from "@/utils/useAuthContext";
import Link from "next/link";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/user/signup", {
        name,
        email,
        password,
      });
      const json = await response.data;
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      router.push("/home");
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
        onSubmit={signup}
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
          Sign Up
        </Typography>
        <TextField
          label="Username"
          type="text"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "#1976d2", textDecoration: "none" }}
          >
            Log In
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
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignupForm;
