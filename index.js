const app = require("./app");
const PORT = 3000;
const { dbConnection } = require("./config/config");

dbConnection();
app.listen(PORT, () => console.log("Server up in port " + PORT));
