const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

const CommentController = {
  async create(req, res, next) {
    try {
      const { postId, content } = req.body;
      if (!postId || !content) {
        return res
          .status(400)
          .json({ message: "Post ID and content are required" });
      }
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      const comment = await Comment.create({
        postId,
        userId: req.user._id,
        content,
      });
      res.status(201).json(comment);
    } catch (error) {
      error.origin = "comment";
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const comments = await Comment.find().populate("userId", "username");
      res.status(200).json(comments);
    } catch (error) {
      error.origin = "comment";
      next(error);
    }
  },
  async update(req, res, next) {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ message: "Content is required" });
      }
      const comment = await Comment.findByIdAndUpdate(
        req.params._id,
        { content },
        { new: true }
      );
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json(comment);
    } catch (error) {
      error.origin = "comment";
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params._id);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      error.origin = "comment";
      next(error);
    }
  },
};

module.exports = CommentController;
