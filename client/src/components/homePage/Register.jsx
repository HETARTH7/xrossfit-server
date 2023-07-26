import React, { useState } from "react";
import axios from "../../api/axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMssg, setErrMssg] = useState("");

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", { username, password });
    } catch (err) {
      setErrMssg("Registration Failed");
    }
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="text-center mt-5 p-5 m-5 border rounded">
        <p className="text-danger">{errMssg}</p>
        <form onSubmit={Register} className="text-center">
          <h1>Register</h1>
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
            Already have an accound? <a href="/login">Login</a>
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "5rem" }}
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
