const express = require("express");
const app = express();

app.use(express.json());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));

module.exports = app;
