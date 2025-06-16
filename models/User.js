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
