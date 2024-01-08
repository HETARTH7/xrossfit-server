import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        const json = await response.json();
        setUsers(json);
      } catch (error) {
        console.error("Error fetching users:", error);
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
