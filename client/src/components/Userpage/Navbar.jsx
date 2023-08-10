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
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/user"}>
          Home
        </Link>
        <button className="navbar-toggler" type="button">
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
          <div className="d-flex" role="search">
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
      </div>
    </nav>
  );
};

export default Navbar;
