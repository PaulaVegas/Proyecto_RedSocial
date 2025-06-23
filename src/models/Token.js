const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Token = mongoose.model("Token", TokenSchema);
module.exports = Token;
