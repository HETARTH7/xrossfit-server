import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav nav-tabs">
      <Link className="nav-item nav-link" to={"/admindashboard"}>
        <i className="fa-solid fa-house"></i> HOME
      </Link>
      <Link className="nav-item nav-link" to={"/manageusers"}>
        <i className="fa-solid fa-user"></i> USERS
      </Link>
      <Link className="nav-item nav-link" to={"/stock"}>
        <i className="fa-solid fa-warehouse"></i> STOCK
      </Link>
      <Link className="nav-item nav-link" to={"/adminorders"}>
        <i className="fa-solid fa-truck"></i> ORDERS
      </Link>
      <Link className="nav-item nav-link" to={"/"}>
        <i className="fa-solid fa-right-from-bracket"></i> LOGOUT
      </Link>
    </div>
  );
};

export default Navbar;
