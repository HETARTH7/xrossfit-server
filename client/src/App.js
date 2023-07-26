import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Homepage/Home";
import Login from "./components/Homepage/Login";
import Register from "./components/Homepage/Register";
import User from "./components/Userpage/User";
import Admin from "./components/Adminpage/Admin";

const App = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <p className="text-center">&copy; {year} Hetarth</p>
    </div>
  );
};

export default App;
