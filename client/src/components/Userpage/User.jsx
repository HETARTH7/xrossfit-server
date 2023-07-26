import React from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import RequireAuth from "../RequireAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  RequireAuth();
  const getData = async () => {
    try {
      const response = await axios.get("/user", {
        headers: { authorization: "Bearer " + auth.accessToken },
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const signout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div>
      <button onClick={getData}>Get User Info</button>
      <button onClick={signout}>Logout</button>
    </div>
  );
};

export default User;
