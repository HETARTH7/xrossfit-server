import React, { useEffect, useState } from "react";
import Back from "./Back";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState("");
  const [mssg, setMssg] = useState("");
  const handleUser = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = (e) => {
    e.preventDefault();
    const user = { username, password };
    axios
      .post("http://localhost:5000/auth", user)
      .then((res) => setAuth(res.data.message))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (auth === "OK") {
      sessionStorage.setItem("user", username);
      window.location = "/dashboard";
    } else if (auth === "Wrong") {
      setMssg("Invalid credentials. Please try again");
    }
  }, [username, auth]);
  return (
    <div>
      <Back />
      <div className="login-page mt-5">
        <form
          className="form-signin w-100 m-auto border border-3 rounded-4"
          onSubmit={login}
        >
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your Username"
            onChange={handleUser}
          />
          <input
            className="form-control mt-3"
            type="password"
            placeholder="Enter your password"
            onChange={handlePassword}
          />
          <p className="mt-5 mb-5">
            Don't have an accound?{" "}
            <a className="text-decoration-none" href="/register">
              Register now!
            </a>
          </p>
          <p className="text-danger">{mssg}</p>
          <button
            className="w-100 btn btn-lg btn-primary"
            style={{ marginTop: "5rem" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
