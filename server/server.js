const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const exerciseRouter = require("./routes/exerciseRouter");
const stockRouter = require("./routes/stockRouter");
const authentication = require("./routes/authentication");
const adminAuth = require("./routes/adminAuth");
const bodyPartRouter = require("./routes/bodyPartRouter");
const bodyExerciseRouter = require("./routes/bodyExerciseRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0/Xrossfit");
app.use("/user", userRouter);
app.use("/exercise", exerciseRouter);
app.use("/stock", stockRouter);
app.use("/auth", authentication);
app.use("/admin", adminAuth);
app.use("/bodypart", bodyPartRouter);
app.use("/bodyexercise", bodyExerciseRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
