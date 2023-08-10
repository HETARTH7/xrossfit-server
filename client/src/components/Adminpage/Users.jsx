import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import RequireAuth from "../RequireAuth";
import Navbar from "./Navbar";

const Admin = () => {
  RequireAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  });

  const deleteUser = (e) => {
    axios.delete(`/users/${e.target.value}`);
  };
  return (
    <div>
      <Navbar />
      {users.map((user, index) => {
        return (
          <div key={index} className="card w-75 mb-3">
            <div className="card-body">
              <h5 className="card-title">{user.username}</h5>
              <p className="card-text">
                {user.email} {user.phno}
              </p>
              <button className="btn btn-primary">View Profile</button>
              <button
                value={user._id}
                onClick={deleteUser}
                className="btn btn-danger ms-5"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
