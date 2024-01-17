const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();
const port = 5000;

app.use("/user", require("./routes/userRouter"));
app.use("/log", require("./routes/exerciseLogRouter"));
app.use("/product", require("./routes/productRouter"));
app.use("/order", require("./routes/orderRouter"));

app.listen(port, () => {
  console.log(`listenting at port ${port}`);
});
