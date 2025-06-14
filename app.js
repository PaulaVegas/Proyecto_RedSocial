const express = require("express");
const app = express();

app.use(express.json());
app.use("/posts", require("./routes/posts"));

module.exports = app;
