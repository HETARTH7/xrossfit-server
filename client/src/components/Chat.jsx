import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = () => {
  const { user } = useAuthContext();
  let friends = [];
  if (user) friends = user.friendsList;
  const [showFind, setShowFind] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        const json = await response.json();
        setUsers(json.filter((x) => x._id !== user.id));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendFriendReq = async (id) => {
    const response = await fetch("http://localhost:5000/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ sender: user.id, reciever: id }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div>
      <Navbar />
      <div>
        <div>
          {friends ? (
            <div>
              <input />
              {friends.map((friend, index) => {
                return <div key={index}>hello</div>;
              })}
            </div>
          ) : (
            <div>You have no friends</div>
          )}
        </div>
        <button onClick={() => setShowFind(true)}>Find</button>
        <button>Requests</button>
        {showFind ? (
          <div>
            <button
              type="button"
              className="btn-close float-end"
              aria-label="Close"
              onClick={() => setShowFind(false)}
            ></button>
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
              {filteredUsers.map((x, index) => (
                <li key={index} className="list-group-item">
                  {x.name}{" "}
                  <button onClick={() => sendFriendReq(x._id)}>Request</button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Chat;
