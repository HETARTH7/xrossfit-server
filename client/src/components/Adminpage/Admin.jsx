import React from "react";
import RequireAuth from "../RequireAuth";

import Navbar from "./Navbar";

const Admin = () => {
  RequireAuth();
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default Admin;
