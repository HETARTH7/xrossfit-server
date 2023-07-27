import React from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import RequireAuth from "../RequireAuth";
import Navbar from "./Navbar";

const User = () => {
  const { auth } = useAuth();
  RequireAuth();
  return (
    <div>
      <Navbar />
      <h1>Hello {auth.username}</h1>
    </div>
  );
};

export default User;
