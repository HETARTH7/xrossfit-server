import React, { useEffect, useState } from "react";
import { useAuthContext } from "../utils/useAuthContext";
import axios from "../api/axios";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

const Messages = ({ user1, user2 }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  var socket;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  const getChatId = async () => {
    if (!user2) return;
    try {
      const response = await axios.post(
        "/chat/id",
        { user1, user2 },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.data;
      return json;
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchMessages = async () => {
    if (!user2) return;
    try {
      const chatId = await getChatId();
      const response = await axios.get("/chat", chatId, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;
      setMessages(json.filter((msg) => msg.chatId === chatId));
      socket.emit("join chat", chatId);
    } catch (error) {
      setError(error.message);
    }
  };

  const sendMessage = async () => {
    setMessage("");
    try {
      const chatId = await getChatId();
      const response = await axios.post(
        "/chat",
        { chatId, sender: user.name, text: message },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(response.data);
      socket.emit("new message", response);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user && user2) {
      fetchMessages();
    }
  }, [user2, sendMessage]);

  return user2 ? (
    <div className="d-flex flex-column">
      <div className="flex-grow-1 overflow-auto p-3">
        {messages?.map((messageObj, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              messageObj.sender === user
                ? "bg-primary text-white align-self-end"
                : "bg-light text-dark align-self-start"
            }`}
            style={{
              maxWidth: "75%",
              alignSelf: messageObj.sender === user ? "flex-end" : "flex-start",
            }}
          >
            <strong>{messageObj.sender}</strong>: {messageObj.text}
          </div>
        ))}
      </div>
      <div className="p-3 border-top">
        <div className="input-group">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>Welcome to Xrossfit Chat</div>
  );
};

export default Messages;
