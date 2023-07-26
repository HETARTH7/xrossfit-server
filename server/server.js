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

app.use("/login", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));
app.use("/product", require("./routes/product"));
app.use("/log", require("./routes/log"));
app.use("/cart", require("./controllers/cartRouter"));
app.use("/muscle/", require("./controllers/muscleRouter"));
app.use("/exercise", require("./routes/exercise"));

const port = 5000;

app.listen(port, () => {
  console.log(`listenting at port ${port}`);
});
