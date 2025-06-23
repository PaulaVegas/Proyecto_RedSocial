const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImage: { type: String },
    tokens: [],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.tokens;
  delete user.password;
  return user;
};
UserSchema.index({
  username: "text",
  email: "text",
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
