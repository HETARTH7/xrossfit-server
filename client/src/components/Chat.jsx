import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../api/axios";
import Error from "./Error";
import Success from "./Success";

const Chat = () => {
  const { user } = useAuthContext();

  const [friends, setFriends] = useState([]);

  const [showUsers, setShowUsers] = useState(false);
  const [showRequests, setShowRequests] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/friend");
        const json = await response.data;
        setSent(
          json.filter((x) => x.sender === user.name).map((y) => y.receiver)
        );
        setReceived(json.filter((x) => x.receiver === user.name));
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios(`/user/${user.id}`);
        const json = await response.data;
        setFriends(json.friendsList);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user");
        const json = await response.data;
        setUsers(json.filter((x) => x !== user.name && !friends.includes(x)));
      } catch (error) {
        setError(error.message);
      }
    };

    if (user) {
      fetchUsers();
      fetchUser();
      fetchRequests();
    }
  }, [friends, user]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendFriendRequest = async (receiver) => {
    try {
      const response = await axios.post("/friend", {
        sender: user.name,
        receiver,
      });
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const acceptRequest = async (id) => {
    try {
      const response = await axios.put(`/friend/${id}`);
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const declineRequest = async (id) => {
    try {
      const response = await axios.delete(`/friend/${id}`);
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Navbar />
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      {friends.map((friend, index) => {
        return <div key={index}>{friend}</div>;
      })}
      <button onClick={() => setShowUsers(true)}>Find</button>
      <button onClick={() => setShowRequests(true)}>Requests</button>
      {showUsers && (
        <div>
          <button
            onClick={() => setShowUsers(false)}
            className="btn-close float-end"
          ></button>
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
                <button
                  disabled={sent.includes(user)}
                  onClick={() => sendFriendRequest(user)}
                >
                  Send
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showRequests && (
        <div>
          <button
            onClick={() => setShowRequests(false)}
            className="btn-close float-end"
          ></button>
          <ul className="list-group">
            {received.map((request, index) => {
              return (
                <li key={index} className="list-group-item">
                  {request.sender}
                  <button onClick={() => acceptRequest(request._id)}>
                    Accept
                  </button>
                  <button onClick={() => declineRequest(request._id)}>
                    Decline
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Chat;
