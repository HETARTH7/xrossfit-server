import React from "react";
import Navbar from "./Navbar";

const Dashboard = () => {
  const user = sessionStorage.getItem("user");

  return (
    <div>
      <Navbar />
      <h1>Hello! {user}</h1>
    </div>
  );
};

export default Dashboard;
