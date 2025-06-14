const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const authentication = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const token = authHeader.split(" ")[1];
		const payload = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(payload.id);
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
		res.status(500).json({ message: "Problem with authentication" });
	}
};

module.exports = authentication;
