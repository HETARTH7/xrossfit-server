import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav nav-tabs">
      <Link className="nav-item nav-link" to={"/dashboard"}>
        <i className="fa-solid fa-house"></i> HOME
      </Link>
      <Link className="nav-item nav-link" to={"/track"}>
        <i className="fa-solid fa-bars"></i> LOG
      </Link>

      <Link className="nav-item nav-link" to={"/exercises-list"}>
        <i className="fa-solid fa-dumbbell"></i> EXERCISES
      </Link>
      <Link className="nav-item nav-link" to={"/shop"}>
      <i className="fa-solid fa-cart-shopping"></i> SHOP
      </Link>
      <div className="nav-item nav-link dropdown">
        <button className="dropbtn">
          <i className="fa-solid fa-user"></i>
        </button>
        <div className="dropdown-content">
          <Link to={"/profile"}><i className="fa-solid fa-address-card"></i> Profile</Link>
          <Link to={"/settings"}><i className="fa-solid fa-gear"></i> Settings</Link>
          <Link to={"/"} onClick={() => sessionStorage.clear()}>
          <i className="fa-solid fa-right-from-bracket"></i> Logout
          </Link>
        </div>
      </div>
      <span className="logo">Xross Fit</span>
    </div>
  );
};

export default Navbar;
