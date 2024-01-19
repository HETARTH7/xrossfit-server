import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Root from "./components/Root.jsx";
import Home from "./components/Home.jsx";
import Track from "./components/Track.jsx";
import Admin from "./components/Admin.jsx";
import Shop from "./components/Shop.jsx";
import Cart from "./components/Cart.jsx";
import Recommendation from "./components/Recommendation.jsx";
import Profile from "./components/Profile.jsx";
import Chat from "./components/Chat.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/recommend" element={<Recommendation />} />
          <Route path="/:name" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
