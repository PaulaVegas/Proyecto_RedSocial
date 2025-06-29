const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId }],
  },
  {
    timestamps: true,
  }
);

CommentSchema.index({
  content: "text",
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
