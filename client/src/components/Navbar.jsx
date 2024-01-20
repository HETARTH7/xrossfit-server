import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const getProfile = async () => {
    navigate(`/${user.name}`);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link
            style={{ color: "#099268" }}
            className="navbar-brand fs-2 fw-bold"
            to={"/home"}
          >
            Xrossfit
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
              <li className="nav-item ms-4">
                <Link className="nav-link" aria-current="page" to="/track">
                  Track
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/shop">
                  Shop
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/recommend">
                  Get recommendation
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" aria-current="page" to="/chat">
                  Chat
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn m-0 p-0">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    alt=""
                    height={"40px"}
                    className="m-2 me-4 rounded-pill"
                    onClick={getProfile}
                  />
                </button>
              </li>

              <li className="nav-item nav-link">
                <button
                  style={{ background: "#96f2d7" }}
                  className="btn rounded"
                  onClick={handleClick}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
