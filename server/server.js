const express = require("express");
const cors = require("cors");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const connectDB = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const { verifyAuthToken } = require("./middleware/verifyAuthToken");

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();
const PORT = 5000;

app.use("/user", require("./routes/userRouter"));

app.use(verifyAuthToken);
app.use("/exercise", require("./routes/exerciseRouter"));
app.use("/product", require("./routes/productRouter"));
app.use("/friend", require("./routes/friendRouter"));
app.use("/chat", require("./routes/chatRouter"));
app.use("/message", require("./routes/messageRouter"));
app.use("/coupon", require("./routes/couponRouter"));
app.use("/cart", require("./routes/cartRouter"));
app.use("/order", require("./routes/orderRouter"));
app.use("/post", require("./routes/blogPostRouter"));

const server = app.listen(PORT, () => {
  console.log(`listenting at port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
