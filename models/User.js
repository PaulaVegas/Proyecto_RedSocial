const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    tokens: [],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
