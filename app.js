const express = require("express");
const app = express();

app.use(express.json());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comments"));

module.exports = app;
