import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const Admin = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link
            style={{ color: "#099268" }}
            className="navbar-brand fs-2 fw-bold"
            to={"/admin"}
          >
            Xrossfit
          </Link>

          <ul className="navbar-nav mb-2 mb-lg-0">
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
      </nav>
    </div>
  );
};

export default Admin;
