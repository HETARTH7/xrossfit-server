import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../utils/useAuthContext";
import axios from "../api/axios";
import Error from "./Error";
import Success from "./Success";
import Messages from "./Messages";

const Chat = () => {
  const { user } = useAuthContext();
  const [chat, setChat] = useState("");

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
        const response = await axios.get("/friend", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
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
        const response = await axios(`/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.data;
        setFriends(json.friendsList);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/user", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
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
      const response = await axios.post(
        "/friend",
        {
          sender: user.name,
          receiver,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const acceptRequest = async (id) => {
    try {
      const response = await axios.put(`/friend/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const declineRequest = async (id) => {
    try {
      const response = await axios.delete(`/friend/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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
      <div className={`row m-0 ${showUsers || showRequests ? "modal" : ""}`}>
        <div className="col-3">
          {friends.map((friend, index) => {
            return (
              <button
                onClick={() => setChat(friend)}
                key={index}
                className="p-3 btn"
              >
                {friend}
              </button>
            );
          })}
        </div>

        <div className="col-9">
          <div className="text-end mt-2">
            <button className="btn me-2" onClick={() => setShowUsers(true)}>
              Find
            </button>
            <button className="btn" onClick={() => setShowRequests(true)}>
              Requests
            </button>
          </div>

          <div>{user ? <Messages user1={user.name} user2={chat} /> : null}</div>
        </div>
      </div>

      {showUsers && (
        <div className="w-25 modal-dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <button
                type="button"
                onClick={() => setShowUsers(false)}
                className="btn-close float-end"
              ></button>
              <div className="modal-header"></div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div
                  className="list-group"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {filteredUsers.map((user, index) => (
                    <p key={index} className="list-group-item">
                      {user}
                      <button
                        className="btn float-end"
                        disabled={sent.includes(user)}
                        onClick={() => sendFriendRequest(user)}
                      >
                        Send
                      </button>
                    </p>
                  ))}
                </div>
                {!filteredUsers.length ? "No users" : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {showRequests && (
        <div className="w-25 modal-dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  onClick={() => setShowRequests(false)}
                  className="btn-close float-end"
                ></button>
              </div>
              <div
                style={{ maxHeight: "200px", overflowY: "auto" }}
                className="model-body"
              >
                <ul className="list-group">
                  {received.map((request, index) => {
                    return (
                      <li key={index} className="list-group-item">
                        {request.sender}
                        <button
                          className="btn"
                          onClick={() => acceptRequest(request._id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn"
                          onClick={() => declineRequest(request._id)}
                        >
                          Decline
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {!received.length ? "No new requests" : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
