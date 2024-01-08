import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = () => {
  const { user } = useAuthContext();
  const [friends, setFriends] = useState([]);

  const [showFind, setShowFind] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (user) setFriends(user.friendsList);
  }, [user]);

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

  const handleFindClick = () => {
    setShowFind(true);
    setShowRequests(false);
  };

  const handleRequestsClick = () => {
    setShowFind(false);
    setShowRequests(true);
  };

  const handleCloseClick = () => {
    setShowFind(false);
    setShowRequests(false);
  };

  return (
    <div>
      <Navbar />
      {friends.length ? (
        <div>
          {friends.map((friend, index) => (
            <div key={index}>{friend}</div>
          ))}
        </div>
      ) : (
        "You have no friends"
      )}
      <button onClick={handleFindClick}>Find</button>
      <button onClick={handleRequestsClick}>Requests</button>
      {showFind && (
        <div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search users"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            className="btn-close float-end"
            onClick={handleCloseClick}
          ></button>
          <ul className="list-group">
            {filteredUsers.map((user, index) => (
              <li key={index} className="list-group-item">
                {user}
              </li>
            ))}
          </ul>
        </div>
      )}
      {showRequests && (
        <div>
          <button
            className="btn-close float-end"
            onClick={handleCloseClick}
          ></button>
        </div>
      )}
    </div>
  );
};

export default Chat;
