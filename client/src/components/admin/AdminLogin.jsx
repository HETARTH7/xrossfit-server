import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Back from "../Back";
import axios from "axios";

const AdminLogin = () => {
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
    const admin = { username, password };
    axios
      .post("http://localhost:5000/admin", admin)
      .then((res) => setAuth(res.data.message))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (auth === "OK") {
      window.location = "/admindashboard";
    } else if (auth === "Wrong") {
      setMssg("Invalid. Please try again");
    }
  }, [username, auth]);
  return (
    <div>
      <Back />
      <div className="login-page">
        <form className="form-signin w-100 m-auto" onSubmit={login}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your Username"
            onChange={handleUser}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            onChange={handlePassword}
          />
          <p>{mssg}</p>
          <button className="w-100 btn btn-lg btn-primary">Login</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLogin;
