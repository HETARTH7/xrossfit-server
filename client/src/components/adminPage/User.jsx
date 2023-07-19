import axios from "axios";
import React, { useState } from "react";
import UserCount from "./UserCount";
import AdminNav from "./AdminNav";

const User = () => {
  const [users, setUsers] = useState([]);
  axios
    .get("http://localhost:5000/user")
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));
  const deleteUser = (id, name) => {
    axios
      .post(`http://localhost:5000/user/delete/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    axios
      .post(`http://localhost:5000/exercise/deleteuser/${name}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setUsers((prevValue) => {
      return prevValue.filter((index) => {
        return index._id !== id;
      });
    });
  };

  return (
    <div>
      <AdminNav />
      <UserCount />
      <div>
        {users.map((user) => {
          return (
            <div key={user.username}>
              <p
                onClick={() => {
                  console.log(user);
                }}
                value={user}
              >
                {user.username}
              </p>
              <button onClick={() => deleteUser(user._id, user.username)}>
                DELETE USER
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
