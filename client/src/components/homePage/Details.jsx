import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Back from "./Back";

const username = sessionStorage.getItem("newuser");

const Details = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phno, setPhno] = useState();
  const [email, setEmail] = useState("");
  const [addone, setAdd1] = useState("");
  const [addtwo, setAdd2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState();

  const newFname = (e) => {
    setFname(e.target.value);
  };
  const newLname = (e) => {
    setLname(e.target.value);
  };
  const newPhno = (e) => {
    setPhno(e.target.value);
  };
  const newEmail = (e) => {
    setEmail(e.target.value);
  };
  const newAdd1 = (e) => {
    setAdd1(e.target.value);
  };
  const newAdd2 = (e) => {
    setAdd2(e.target.value);
  };
  const newCity = (e) => {
    setCity(e.target.value);
  };
  const newState = (e) => {
    setState(e.target.value);
  };
  const newPincode = (e) => {
    setPincode(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      fname,
      lname,
      phno,
      email,
      addone,
      addtwo,
      city,
      state,
      pincode,
    };
    console.log(newUser);
    axios
      .post("http://localhost:5000/user/add", newUser)
      .then((res) => console.log(res.data.message))
      .catch((err) => console.log(err));
    sessionStorage.clear();
    window.location = "/";
  };
  return (
    <div>
      <Back />
      <div>
        <form className="text-center" onSubmit={onSubmit}>
          <h1>Welcome {username}</h1>
          <p>Please enter your details. You can update them later</p>
          <div className="row align-items-start">
            <input
              className="col m-2 rounded"
              onChange={newFname}
              type="text"
              placeholder="Enter your First name"
            />
            <input
              className="col m-2 rounded"
              onChange={newLname}
              type="text"
              placeholder="Enter your Last name"
            />
            <input
              className="col m-2 rounded"
              onChange={newPhno}
              type="tel"
              placeholder="Enter your Phone Number"
            />
          </div>
          <div className="row align-items-start">
            <input
              className="col m-2 rounded"
              onChange={newEmail}
              type="email"
              placeholder="Enter your Email"
            />
            <input
              className="col m-2 rounded"
              onChange={newAdd1}
              type="text"
              placeholder="Address Line 1"
            />
            <input
              className="col m-2 rounded"
              onChange={newAdd2}
              type="text"
              placeholder="Address Line 1"
            />
          </div>
          <div className="row align-items-start">
            <input
              className="col m-2 rounded"
              onChange={newCity}
              type="text"
              placeholder="City"
            />
            <input
              className="col m-2 rounded"
              onChange={newState}
              type="text"
              placeholder="State"
            />
            <input
              className="col m-2 rounded"
              onChange={newPincode}
              type="text"
              placeholder="pincode"
            />
          </div>

          <button
            className="btn btn-outline-success"
            style={{ marginTop: "5rem" }}
          >
            Create Account
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Details;
