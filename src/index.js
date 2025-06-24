require("dotenv").config();
const express = require("express");
const app = express();
const { dbConnection } = require("./config/config");
const { typeError } = require("./middlewares/errors");

const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

dbConnection();
app.use(express.json());

app.use("/posts", require("./routes/posts"));
app.use("/users", require("./routes/users"));
app.use("/comments", require("./routes/comments"));
app.use(typeError);
app.use(
	"/api-docs",
	swaggerUI.serve,
	swaggerUI.setup(docs, { explorer: true })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}`));
