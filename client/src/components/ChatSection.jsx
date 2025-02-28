import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Fab,
  IconButton,
  Typography,
  TextField,
  List,
  ListItem,
  Divider,
  Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "@/api/axios";
import { useAuthContext } from "@/utils/useAuthContext";
import { toast } from "react-toastify";
import { Send } from "@mui/icons-material";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

let socket;
let selectedChatCompare;

const ChatSection = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const typingTimeout = useRef();

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      socket.emit("join chat", selectedChat);
    }
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessage) => {
      if (
        !selectedChatCompare || // No chat selected
        selectedChatCompare !== newMessage.chat._id // Not the current chat
      ) {
        // Optional: Handle notification for a new message in other chats
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  }, []);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChatClick = async (chatID) => {
    try {
      const response = await axios.get(`/message/${chatID}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;
      setMessages(json.messages);
      setSelectedChat(chatID);

      socket.emit("join chat", chatID); // Join socket room for this chat
    } catch (error) {
      if (error.response?.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  };

  const handleBack = () => {
    setSelectedChat(null);
    setNewMessage("");
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const payload = {
      chatID: selectedChat,
      senderID: user.userId,
      senderName: user.name,
      message: newMessage.trim(),
    };

    try {
      const response = await axios.post("/message/send", payload, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const sentMessage = await response.data;

      setMessages((prevMessages) => [...prevMessages, sentMessage.message]);
      setNewMessage("");

      socket.emit("new message", sentMessage.message); // Emit message to other users
    } catch (error) {
      if (error.response?.data) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat);
    }

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit("stop typing", selectedChat);
      setTyping(false);
    }, 2000);
  };

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await axios.get(`/user/chats/${user.userId}`);
        const json = await response.data;
        setChats(json);
      } catch (error) {
        if (error.response?.data) toast.error(error.response.data.message);
        else toast.error(error.message);
      }
    };

    if (user) getChats();
  }, [user]);

  const filteredChats = chats.filter((chat) =>
    chat.chatName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        onClick={toggleChat}
      >
        <ChatIcon />
      </Fab>

      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 70,
            right: 40,
            width: 300,
            height: 400,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            zIndex: 2,
          }}
        >
          {!selectedChat ? (
            <>
              <Box sx={{ px: 2, py: 1, borderBottom: "1px solid #ddd" }}>
                <TextField
                  fullWidth
                  placeholder="Search chats..."
                  size="small"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Box>
              <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                <List>
                  {filteredChats.map((chat) => (
                    <React.Fragment key={chat.chatID}>
                      <ListItem
                        sx={{
                          cursor: "pointer",
                          "&:hover": { bgcolor: "action.hover" },
                        }}
                        onClick={() => handleChatClick(chat.chatID)}
                      >
                        {chat.chatName}
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  borderBottom: "1px solid #ddd",
                }}
              >
                <IconButton onClick={handleBack} color="primary">
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" sx={{ ml: 2 }}>
                  Messages
                </Typography>
              </Box>

              <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
                {messages.map((message, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {message.senderName}
                    </Typography>
                    <Typography variant="body2">{message.message}</Typography>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
                {isTyping && (
                  <Typography variant="body2" color="textSecondary">
                    Someone is typing...
                  </Typography>
                )}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  borderTop: "1px solid #ddd",
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  size="small"
                  value={newMessage}
                  onChange={handleTyping}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  sx={{ mr: 1 }}
                />
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default ChatSection;
