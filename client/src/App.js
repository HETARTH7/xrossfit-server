import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Homepage/Home";
import Login from "./components/Homepage/Login";
import Register from "./components/Homepage/Register";
import User from "./components/Userpage/User";
import Admin from "./components/Adminpage/Admin";
import Tracker from "./components/Userpage/Tracker";
import Exercise from "./components/Userpage/Exercise";
import Shop from "./components/Userpage/Shop";
import Users from "./components/Adminpage/Users";

const App = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Page */}
          <Route path="/user" element={<User />} />
          <Route path="/track" element={<Tracker />} />
          <Route path="/list" element={<Exercise />} />
          <Route path="/store" element={<Shop />} />

          {/* Admin Page */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
      <footer
        style={{
          position: "fixed",
          left: 0,
          bottom: 0,
          textAlign: "center",
          width: "100%",
        }}
      >
        &copy; {year} Hetarth
      </footer>
    </div>
  );
};

export default App;
