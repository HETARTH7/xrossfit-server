import React from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import RequireAuth from "../RequireAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  RequireAuth();
  const getData = async () => {
    try {
      const response = await axios.get("/admin", {
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
      <button onClick={getData}>Get Admin Info</button>
      <button onClick={signout}>Logout</button>
    </div>
  );
};

export default Admin;
