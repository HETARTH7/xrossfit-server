import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

import Charts from "./Charts";
import Users from "./Users";
import Product from "./Products";
import Orders from "./Orders";

const Admin = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [page, setPage] = useState("Dashboard");

  const handleClick = () => {
    logout();
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const changePage = (e) => {
    setPage(e.target.innerText);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav
          id="sidebar"
          className={`col-md-3 col-lg-2 d-md-block sidebar ${
            sidebarCollapsed ? "collapse" : ""
          }`}
        >
          <div className="position-sticky">
            <ul className="nav flex-column">
              <Link
                style={{ color: "#099268" }}
                className="navbar-brand fs-2 fw-bold mb-md-5"
                to={"/admin"}
              >
                Xrossfit Admin
              </Link>
              <button
                className="nav-item nav-link text-success mb-md-5"
                onClick={changePage}
              >
                Dashboard
              </button>
              <button
                className="nav-item nav-link text-success mb-md-5"
                onClick={changePage}
              >
                Users
              </button>
              <button
                className="nav-item nav-link text-success mb-md-5"
                onClick={changePage}
              >
                Products
              </button>
              <button
                className="nav-item nav-link text-success mb-md-5"
                onClick={changePage}
              >
                Orders
              </button>
              <button
                className="nav-item nav-link text-success mb-md-5"
                onClick={handleClick}
              >
                Log out
              </button>
            </ul>
          </div>
        </nav>
        <main
          className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 ${
            sidebarCollapsed ? "sidebar-closed" : ""
          }`}
        >
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                onClick={toggleSidebar}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </nav>
          {page === "Dashboard" ? (
            <Charts />
          ) : page === "Users" ? (
            <Users />
          ) : page === "Products" ? (
            <Product />
          ) : (
            <Orders />
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
