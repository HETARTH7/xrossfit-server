import React, { useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const navigate = useNavigate();

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/login", { username, password });
      const accessToken = response.data.accessToken;
      const role = response.data.role;
      setAuth({ username, accessToken });
      role === "user" ? navigate("/user") : navigate("/admin");
      localStorage["user"] = username;
      localStorage["isLoggedIn"] = true;
    } catch (err) {
      setErrMssg("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="text-center mt-5 p-5 m-5 border rounded">
        <form onSubmit={Login} className="text-center">
          <h1>Login</h1>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input onChange={changeUsername} className="form-control" />
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input
                onChange={changePassword}
                type="password"
                className="form-control"
              />
            </div>
          </div>
          <p className="">
            Dont't have an accound? <a href="/register">Register</a>
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "5rem" }}
          >
            Login
          </button>
        </form>
      </div>
      <p className="text-danger text-center">{errMssg}</p>
    </div>
  );
};

export default Login;
