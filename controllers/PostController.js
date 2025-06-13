const Post = require("../models/Post");

const PostController = {
	async createPost(req, res) {
		try {
			const post = await Post.create(req.body);
			res.status(201).json(post);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error creating post" });
		}
	},
	async getAll(req, res) {
		try {
			const posts = await Post.find();
			res.send(posts);
		} catch (error) {
			console.error(error);
		}
	},
	async getById(req, res) {
		try {
			const post = await Post.findById(req.params._id);
			res.send(post);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error fetching post" });
		}
	},
	async getByTitle(req, res) {
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
			console.error(error);
			res.status(500).json({ message: "Error fetching posts by title" });
		}
	},
	async delete(req, res) {
		try {
			const post = await Post.findByIdAndDelete(req.params._id);
			if (!post) {
				return res.status(404).json({ message: "Post not found" });
			}
			res.status(200).json({ message: "Post deleted successfully" });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error deleting post" });
		}
	},
	async update(req, res) {
		try {
			const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
				new: true,
				runValidators: true,
			});
			if (!post) {
				return res.status(404).json({ message: "Post not found" });
			}
			res.status(200).json(post);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error updating post" });
		}
	},
};

module.exports = PostController;
