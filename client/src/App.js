import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/Root";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import Track from "./components/Track.jsx";
import Recommendation from "./components/Recommendation.jsx";
import Admin from "./components/Admin.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="track" element={<Track />} />
          <Route path="/recommend" element={<Recommendation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
