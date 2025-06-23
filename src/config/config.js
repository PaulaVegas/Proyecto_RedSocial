const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = { dbConnection, JWT_SECRET };
