const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: String,
		email: String,
		password: String,
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
