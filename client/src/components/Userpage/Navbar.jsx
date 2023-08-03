import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

const Navbar = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const signout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-dark" aria-current="page" to="/user">
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/track">
              Track Exercise
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/list">
              Exercise Recommendation
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/store">
              Shop
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <img
            src="/profile.svg"
            alt=""
            style={{ width: "1.5rem", marginLeft: "1rem" }}
          />
          <img
            src="/settings.svg"
            alt=""
            style={{ width: "1.5rem", marginLeft: "1rem" }}
          />
          <img
            onClick={signout}
            src="/logout.svg"
            alt=""
            style={{ width: "1.5rem", marginLeft: "1rem" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
