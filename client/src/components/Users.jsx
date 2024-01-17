import React, { useEffect, useState } from "react";
import Error from "./Error";
import axios from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user");
        const json = await response.data;
        setUsers(json);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {error && <Error message={error} />}
      <h2>Users</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className="list-group">
        {filteredUsers.map((user, index) => (
          <li key={index} className="list-group-item">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
