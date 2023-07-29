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
            <Link
              className="nav-link text-dark"
              aria-current="page"
              to="/admin"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/users">
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/orders">
              Orders
            </Link>
          </li>
        </ul>
        <button
          onClick={signout}
          className="btn btn-danger d-flex"
          type="submit"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
