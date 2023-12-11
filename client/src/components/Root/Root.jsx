import React from "react";
import { Link } from "react-router-dom";
import "./Root.css";

const Root = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="title fw-bold">Xrossfit</h1>
        <p className="pb-5 fs-3">
          Track daily exercises. Shop fitness equipment. Get personalized
          exercise recommendations. Chat with other fitness enthusiasts
        </p>

        <Link
          style={{ background: "#96f2d7" }}
          className="btn fs-4 rounded-pill hov"
          to="/login"
        >
          Login
        </Link>
        <Link className="button btn fs-4" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Root;
