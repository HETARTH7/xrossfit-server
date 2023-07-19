import React, { useState } from "react";
import axios from "axios";

const UserCount = () => {
  const [users, setUsers] = useState([]);
  var c = 0;
  axios
    .get("http://localhost:5000/user")
    .then((res) => setUsers(res.data))
    .catch((err) => console.log(err));

  const count = () => {
    users.forEach(() => c++);
  };
  count();
  return <div>UserCount:{c}</div>;
};

export default UserCount;
