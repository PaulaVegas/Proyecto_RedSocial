const express = require("express");
const app = express();
const PORT = 3000;
const dbConnection = require("./config/config.js");

app.use(express.json());
dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
