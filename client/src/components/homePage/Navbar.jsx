import React from "react";
import { Link } from "react-router-dom";

const HomeNav = () => {
  return (
    <div style={{backgroundColor:"white"}}>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <span className="logo fs-2" style={{ fontFamily: "Lobster,cursive" }}>Xross Fit</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-dark ms-3 me-3">
              <Link className="nav-item nav-link" to={"/login"}>
                Sign in
              </Link>
            </button>
            <button className="btn btn-outline-dark ms-3 me-3">
              <Link className="nav-item nav-link" to={"/register"}>
                Sign up
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HomeNav;
