import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { auth } = useAuth();
  const user = auth.username;
  const logout = useLogout();
  const navigate = useNavigate();
  const signout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/user"}>
          Home
        </Link>
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
              <Link className="nav-link" aria-current="page" to="/track">
                Track Exercise
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">
                Exercise Recommendation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/store">
                Store
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={`/${user}`} className="nav-link">
                Profile
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link">Settings</Link>
            </li>

            <li onClick={signout} className="nav-item nav-link">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
