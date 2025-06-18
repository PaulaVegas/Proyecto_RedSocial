const express = require("express");
const app = express();
const { typeError } = require("./middlewares/errors");
app.use(express.json());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comments"));

app.use(typeError);
module.exports = app;
