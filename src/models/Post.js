const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
	{
		title: String,
		content: String,
		image: { type: String },
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		commentIds: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Comment",
			},
		],
		likes: [{ type: mongoose.Schema.Types.ObjectId }],
	},
	{
		timestamps: true,
	}
);

PostSchema.index({
	title: "text",
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
