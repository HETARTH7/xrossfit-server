import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Back from "./Back";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState("");
  const [mssg, setMssg] = useState("");

  const newUserEnter = (e) => {
    setUsername(e.target.value);
  };
  const newPasswordEnter = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    console.log(newUser);
    axios
      .post("http://localhost:5000/user/create", newUser)
      .then((res) => setExists(res.data.message))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (exists === "OK") {
      sessionStorage.setItem("newuser", username);
      window.location = "/details";
    } else if (exists === "Exists") {
      setMssg("Username already exists. Enter new Username");
    }
  }, [exists, username]);
  return (
    <div>
      <Back />
      <div className="login-page pt-5">
        <form
          className="form-signin w-100 m-auto border border-3 rounded-4"
          onSubmit={onSubmit}
        >
          <h1 className="h3 mb-3 fw-normal">Create New Account</h1>
          <input
            onChange={newUserEnter}
            type="text"
            placeholder="Enter your Username"
            className="form-control mb-2"
          />
          <input
            onChange={newPasswordEnter}
            type="password"
            placeholder="Enter your password"
            className="form-control mb-2"
          />
          <p>{mssg}</p>
          <button className="w-100 btn btn-lg btn-primary">Next</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
