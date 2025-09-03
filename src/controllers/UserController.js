const User = require("../models/User");
const Token = require("../models/Token");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config/config");
const jwt = require("jsonwebtoken");

const UserController = {
	async register(req, res, next) {
		try {
			const { password, email, ...rest } = req.body;
			if (!email || !password) {
				return res
					.status(400)
					.send({ message: "Email and password are required" });
			}
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res
					.status(400)
					.send({ message: "Email already exists, please use another one" });
			}
			const hashedPassword = bcrypt.hashSync(password, 10);
			const newUserData = {
				...rest,
				email,
				role: "user",
				password: hashedPassword,
				profileImage: req.file ? req.file.path : null,
			};
			const user = await User.create(newUserData);
			res.status(201).send({
				message: "User registered successfully",
				username: user.username,
				profileImage: user.profileImage,
			});
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async login(req, res, next) {
		try {
			const user = await User.findOne({ email: req.body.email });
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
			const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
			await Token.create({ userId: user._id, token });
			if (user.tokens.length > 3) user.tokens.shift();
			user.tokens.push(token);
			await user.save();
			res.status(200).send({
				message: "Welcome, " + user.username,
				token,
				user: {
					id: user._id,
					username: user.username,
					email: user.email,
					profileImage: user.profileImage,
				},
			});
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},

	async getAll(req, res, next) {
		try {
			const users = await User.find({}, "-password").populate({
				path: "posts",
				select: "_id title content",
			});
			res.status(200).send(users);
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async getById(req, res, next) {
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
			error.origin = "user";
			next(error);
		}
	},
	async getInfo(req, res, next) {
		try {
			const user = await User.findById(req.user._id)
				.select("-password")
				.populate({
					path: "posts",
					populate: {
						path: "comments",
					},
				})
				.populate("likedPosts")
				.populate({
					path: "followers",
					select: "username profileImage",
				})
				.populate({
					path: "following",
					select: "username profileImage",
				});
			res.status(200).send(user);
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async update(req, res, next) {
		try {
			const { password, ...rest } = req.body;
			const hashedPassword = password
				? bcrypt.hashSync(password, 10)
				: undefined;
			const updatedUserData = { ...rest };
			if (hashedPassword) updatedUserData.password = hashedPassword;
			if (req.file) updatedUserData.profileImage = req.file.path;
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
			error.origin = "user";
			next(error);
		}
	},
	async delete(req, res, next) {
		try {
			const user = await User.findByIdAndDelete(req.params._id);
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			await Post.deleteMany({ userId: req.params._id });
			res.status(200).send({ message: "User deleted successfully" });
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async logout(req, res, next) {
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
			error.origin = "user";
			next(error);
		}
	},
	async followUser(req, res, next) {
		try {
			const userToFollow = await User.findById(req.params._id);
			if (!userToFollow) {
				return res.status(404).send({ message: "User not found" });
			}
			if (userToFollow.followers.includes(req.user._id)) {
				return res.status(400).send({ message: "Already following this user" });
			}
			userToFollow.followers.push(req.user._id);
			await userToFollow.save();
			req.user.following.push(userToFollow._id);
			await req.user.save();
			res.status(200).send({
				message: `You are now following ${userToFollow.username}`,
				user: userToFollow,
			});
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async unfollowUser(req, res, next) {
		try {
			const userToUnfollow = await User.findById(req.params._id);
			if (!userToUnfollow) {
				return res.status(404).send({ message: "User not found" });
			}
			if (!userToUnfollow.followers.includes(req.user._id)) {
				return res.status(400).send({ message: "Not following this user" });
			}
			userToUnfollow.followers.pull(req.user._id);
			await userToUnfollow.save();
			req.user.following.pull(userToUnfollow._id);
			await req.user.save();
			res.status(200).send({
				message: `You have unfollowed ${userToUnfollow.username}`,
				user: userToUnfollow,
			});
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async getFollowers(req, res, next) {
		try {
			const user = await User.findById(req.params._id)
				.populate("followers", "username email")
				.select("-password");
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			res.status(200).send(user.followers);
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async getFollowing(req, res, next) {
		try {
			const user = await User.findById(req.params._id)
				.populate("following", "username email")
				.select("-password");
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			res.status(200).send(user.following);
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async getByName(req, res, next) {
		try {
			const user = await User.findOne({ username: req.params.username })
				.select("-password")
				.populate({
					path: "posts",
					select: "_id title content",
				})
				.populate({
					path: "followers",
					select: "username",
				});

			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}

			const userInfo = {
				...user.toObject(),
				followersCount: user.followers.length,
			};

			res.status(200).send(userInfo);
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
	async getSuggestions(req, res, next) {
		try {
			const currentUserId = req.user._id;
			const suggestions = await User.aggregate([
				{ $match: { _id: { $ne: currentUserId } } },
				{ $sample: { size: 5 } },
				{ $project: { username: 1, profileImage: 1 } },
			]);

			res.status(200).json(suggestions);
		} catch (error) {
			error.origin = "user";
			next(error);
		}
	},
};

module.exports = UserController;
