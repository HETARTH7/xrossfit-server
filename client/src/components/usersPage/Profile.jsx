import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
const Profile = () => {
  const [data, setData] = useState([]);
  const user = sessionStorage.getItem("user");
  axios
    .get(`http://localhost:5000/user/${user}`)
    .then((res) => setData(res.data))
    .catch((err) => console.log(err));
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Profile</h1>
        {data.map((x, index) => {
          return (
            <div key={index}>
              <div className="row align-items-start">
                <div className="col">
                  <h2>USERNAME</h2>
                  <p>{x.username}</p>
                </div>
                <div className="col">
                  <h2>First Name</h2>
                  <p>{x.fname}</p>
                </div>
                <div className="col">
                  <h2>Last Name</h2>
                  <p>{x.lname}</p>
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col">
                  <h2>Phone Number</h2>
                  <p>{x.phno}</p>
                </div>
                <div className="col">
                  <h2>Email</h2>
                  <p>{x.email}</p>
                </div>
                <div className="col">
                  <h2>Address</h2>
                  <p>
                    {x.addl1}, {x.addl2}, {x.city}, {x.state}, India {x.pincode}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
