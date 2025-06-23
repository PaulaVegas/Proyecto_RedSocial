const Post = require("../models/Post");
const User = require("../models/User");
const Comment = require("../models/Comment");

const PostController = {
  async createPost(req, res, next) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }
      const newPostData = {
        ...req.body,
        userId: req.user._id,
        image: req.file ? req.file.path : null,
      };
      const post = await Post.create(newPostData);
      await User.findByIdAndUpdate(req.user._id, {
        $push: { postIds: post._id },
      });
      res.status(201).send(post);
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
        .limit(limit)
        .skip((page - 1) * limit);
      const postsWithComments = await Promise.all(
        posts.map(async (post) => {
          const comments = await Comment.find({ postId: post._id }).populate(
            "userId",
            "username"
          );
          const commentsWithLikesCount = comments.map((comment) => ({
            ...comment.toObject(),
            likesCount: comment.likes.length,
          }));
          return {
            ...post.toObject(),
            likesCount: post.likes.length,
            comments: commentsWithLikesCount,
          };
        })
      );
      res
        .status(200)
        .json({ messsage: "Post with comments: ", postsWithComments });
    } catch (error) {
      error.origin = "post";
      next(error);
    }
  },
  async getById(req, res, next) {
    try {
      const post = await Post.findById(req.params._id);
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
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      error.origin = "post";
      next(error);
    }
  },
  async likePost(req, res, next) {
    try {
      const post = await Post.findById(req.params._id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (post.likes.some((likeId) => likeId.equals(req.user._id))) {
        return res.status(400).json({ message: "Post already liked" });
      }
      post.likes.push(req.user._id);
      await post.save();
      await User.findByIdAndUpdate(
        req.user._id,
        { $addToSet: { likedPosts: post._id } },
        { new: true }
      );
      res.status(200).json({
        message: "Post liked successfully",
        likesCount: post.likes.length,
        post,
      });
    } catch (error) {
      error.origin = "post";
      next(error);
    }
  },
  async unlikePost(req, res, next) {
    try {
      const post = await Post.findById(req.params._id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (!post.likes.includes(req.user._id)) {
        return res.status(400).json({ message: "Post not liked yet" });
      }
      post.likes = post.likes.filter(
        (like) => like.toString() !== req.user._id
      );
      await post.save();
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { likedPosts: post._id } },
        { new: true }
      );
      res.status(200).json({
        message: "Post unliked successfully",
        likesCount: post.likes.length,
        post,
      });
    } catch (error) {
      error.origin = "post";
      next(error);
    }
  },
};

module.exports = PostController;
