const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 3000;
const { typeError } = require("./middlewares/errors");
const { dbConnection } = require("./config/config");

app.use(express.json());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comments"));
app.use(typeError);
console.log("MONGO_URI al iniciar:", process.env.MONGO_URI);

dbConnection();

app.listen(PORT, () => console.log("Server up in port " + PORT));
