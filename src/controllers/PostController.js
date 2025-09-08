const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");
const cloudinary = require("cloudinary").v2;

const PostController = {
	async createPost(req, res, next) {
		try {
			const { title, content } = req.body;
			if (!title || !content) {
				return res
					.status(400)
					.json({ message: "Title and content are required" });
			}

			const post = await Post.create({
				title,
				content,
				userId: req.user._id,
				image: req.file ? req.file.path : null,
			});
			await User.findByIdAndUpdate(req.user._id, {
				$push: { postIds: post._id },
			});
			res.status(201).json(post);
		} catch (error) {
			error.origin = "post";
			next(error);
		}
	},

	async getAll(req, res, next) {
		try {
			const page = parseInt(req.query.page) || 1;
			const limit = parseInt(req.query.limit) || 10;

			const posts = await Post.find()
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(limit)
				.populate({
					path: "commentIds",
					populate: { path: "userId", select: "username" },
				})
				.populate("userId", "username");

			const total = await Post.countDocuments();

			const postsWithLikes = posts.map((post) => ({
				...post.toObject(),
				likesCount: post.likes ? post.likes.length : 0,
			}));

			res.status(200).json({
				posts: postsWithLikes,
				total,
				page,
				pages: Math.ceil(total / limit),
			});
		} catch (error) {
			console.error(error);
			next(error);
		}
	},

	async getById(req, res, next) {
		try {
			const post = await Post.findById(req.params._id)
				.populate({
					path: "commentIds",
					populate: { path: "userId", select: "username" },
				})
				.populate("userId", "username");
			if (!post) {
				return res.status(404).json({ message: "Post not found" });
			}
			res.status(200).send(post);
		} catch (error) {
			error.origin = "post";
			next(error);
		}
	},

	async getByTitle(req, res, next) {
		try {
			const searchedTitle = req.params.title;
			if (searchedTitle.length > 20) {
				return res.status(400).json({ message: "Title length exceeds limit" });
			}
			const posts = await Post.find({
				$text: {
					$search: searchedTitle,
				},
			});
			res.status(200).json(posts);
		} catch (error) {
			error.origin = "post";
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const post = await Post.findByIdAndDelete(req.params._id);
			if (!post) {
				return res.status(404).json({ message: "Post not found" });
			}
			res.status(200).json({ message: "Post deleted successfully" });
		} catch (error) {
			error.origin = "post";
			next(error);
		}
	},
	async update(req, res, next) {
		try {
			const post = await Post.findById(req.params._id);
			if (!post) {
				return res.status(404).json({ message: "Post not found" });
			}

			const updateData = {
				title: req.body.title,
				content: req.body.content,
				image: post.image,
			};

			if (req.file) {
				if (post.image) {
					const parts = post.image.split("/");
					const filename = parts[parts.length - 1];
					const publicId = filename.split(".")[0];

					await cloudinary.uploader.destroy(`meowspace_posts/${publicId}`);
				}
				updateData.image = req.file.path;
			}

			const updatedPost = await Post.findByIdAndUpdate(
				req.params._id,
				{ $set: updateData },
				{ new: true, runValidators: true }
			);

			res.status(200).json(updatedPost);
		} catch (error) {
			error.origin = "post";
			next(error);
		}
	},

	async likePost(req, res, next) {
		try {
			const post = await Post.findById(req.params._id);
			if (!post) return res.status(404).json({ message: "Post not found" });

			const userIdStr = req.user._id.toString();

			if (post.likes.some((id) => id.toString() === userIdStr)) {
				return res.status(400).json({ message: "Post already liked" });
			}

			post.likes.push(req.user._id);
			await post.save();
			await User.findByIdAndUpdate(req.user._id, {
				$addToSet: { likedPosts: post._id },
			});

			res.status(200).json({
				message: "Post liked successfully",
				likesCount: post.likes.length,
			});
		} catch (error) {
			next(error);
		}
	},

	async unlikePost(req, res, next) {
		try {
			const post = await Post.findById(req.params._id);
			if (!post) return res.status(404).json({ message: "Post not found" });

			const userIdStr = req.user._id.toString();

			if (!post.likes.some((id) => id.toString() === userIdStr)) {
				return res.status(400).json({ message: "Post not liked yet" });
			}

			post.likes = post.likes.filter((id) => id.toString() !== userIdStr);
			await post.save();
			await User.findByIdAndUpdate(req.user._id, {
				$pull: { likedPosts: post._id },
			});

			res.status(200).json({
				message: "Post unliked successfully",
				likesCount: post.likes.length,
			});
		} catch (error) {
			next(error);
		}
	},
	async toggleLike(req, res, next) {
		try {
			const post = await Post.findById(req.params._id);
			if (!post) return res.status(404).json({ message: "Post not found" });

			const userIdStr = req.user._id.toString();
			let liked = false;

			if (post.likes.some((id) => id.toString() === userIdStr)) {
				post.likes = post.likes.filter((id) => id.toString() !== userIdStr);
				await User.findByIdAndUpdate(req.user._id, {
					$pull: { likedPosts: post._id },
				});
			} else {
				post.likes.push(req.user._id);
				await User.findByIdAndUpdate(req.user._id, {
					$addToSet: { likedPosts: post._id },
				});
				liked = true;
			}

			await post.save();

			res.status(200).json({ likesCount: post.likes.length, liked });
		} catch (error) {
			next(error);
		}
	},
};

module.exports = PostController;
