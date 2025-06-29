const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const Comment = require("../models/Comment");

const authentication = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const token = authHeader.split(" ")[1];
		const payload = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(payload.id).select("-password");
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const tokenFound = await Token.findOne({ userId: user._id, token });
		if (!tokenFound) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.error(error);
		if (
			error.name === "JsonWebTokenError" ||
			error.name === "TokenExpiredError"
		) {
			return res.status(401).json({ message: "Invalid or expired token" });
		}
		res.status(500).json({ message: "Problem with authentication" });
	}
};

const isAuth = async (req, res, next) => {
	try {
		const commentId = req.params._id;
		const comment = await Comment.findById(commentId);
		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}
		if (comment.author.toString() !== req.user._id.toString()) {
			return res
				.status(403)
				.json({ message: "You are not authorized to modify this comment" });
		}
		next();
	} catch (error) {
		error.origin = "auth";
		next(error);
	}
};

module.exports = { authentication, isAuth };
