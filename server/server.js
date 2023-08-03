const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConfig");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

const app = express();
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/users", require("./routes/users"));
app.use("/login", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/log", require("./routes/log"));
app.use("/product", require("./routes/product"));
app.use("/wishlist", require("./routes/wishlist"));
app.use("/cart", require("./routes/cart"));

const port = 5000;

app.listen(port, () => {
  console.log(`listenting at port ${port}`);
});
