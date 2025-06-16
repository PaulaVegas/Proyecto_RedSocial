const User = require("../models/User");
const Token = require("../models/Token");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

const UserController = {
	create(req, res) {
		const { password, ...rest } = req.body;
		if (!req.body.email || !req.body.password) {
			return res
				.status(400)
				.send({ message: "Email and password are required" });
		}
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUserData = { ...rest, role: "user", password: hashedPassword };

		User.create(newUserData)
			.then((user) =>
				res.status(201).send({ message: "User created successfully", user })
			)
			.catch(
				(err) =>
					console.error(err) &&
					res.status(500).send({ message: "Error creating user" })
			);
	},
	login(req, res) {
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					return res.status(404).send({ message: "User not found" });
				}
				const isPasswordValid = bcrypt.compareSync(
					req.body.password,
					user.password
				);
				if (!isPasswordValid) {
					return res
						.status(401)
						.send({ message: "Invalid user or password, try again" });
				}
				const token = jwt.sign({ id: user._id }, JWT_SECRET);
				Token.create({ userId: user._id, token });
				res.status(200).send({ message: "Login successful", user, token });
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send({ message: "Error logging in" });
			});
	},
	async getAll(req, res) {
		try {
			const users = await User.find({}, "-password").populate({
				path: "posts",
				select: "_id title content",
			});
			res.status(200).send(users);
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error fetching users" });
		}
	},
	async getById(req, res) {
		try {
			const user = await User.findById(req.params._id)
				.select("-password")
				.populate({
					path: "posts",
					select: "_id title content",
				});

			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			res.status(200).send(user);
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error fetching user" });
		}
	},
	async getMe(req, res) {
		try {
			const user = req.user;
			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}
			const { _id, username, email } = userToSend;
			res.status(200).json({ _id, username, email });
		} catch (error) {
			console.error(error);
			res
				.status(500)
				.json({ message: "Error fetching user data", error: error.message });
		}
	},
	async update(req, res) {
		try {
			const { password, ...rest } = req.body;
			const hashedPassword = password
				? bcrypt.hashSync(password, 10)
				: undefined;
			const updatedUserData = { ...rest, password: hashedPassword };
			const user = await User.findByIdAndUpdate(
				req.params._id,
				updatedUserData,
				{ new: true }
			);
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			res.status(200).send({ message: "User updated successfully", user });
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error updating user" });
		}
	},
	async delete(req, res) {
		try {
			const user = await User.findByIdAndDelete(req.params._id);
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			// Also delete all posts by this user
			await Post.deleteMany({ userId: req.params._id });
			res.status(200).send({ message: "User deleted successfully" });
		} catch (error) {
			console.error(error);
			res.status(500).send({ message: "Error deleting user" });
		}
	},
	async logout(req, res) {
		try {
			console.log("Logging out user:", req.user._id);
			if (!req.user || !req.headers.authorization) {
				return res.status(401).json({ message: "No user or token found" });
			}
			const token = req.headers.authorization.split(" ")[1];
			await Token.findOneAndDelete({
				userId: req.user._id,
				token: token,
			});
			return res.status(200).json({ message: "Logout successful" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Error logging out" });
		}
	},
};

module.exports = UserController;
