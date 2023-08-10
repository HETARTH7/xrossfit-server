import React from "react";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  const user = auth.username;
  return (
    <div>
      <Navbar />
      {user}
    </div>
  );
};

export default Profile;
