module.exports = {
	components: {
		securitySchemes: {
			ApiKeyAuth: {
				type: "apiKey",
				name: "Authorization",
				in: "header",
			},
		},

		schemas: {
			user: {
				type: "object",
				properties: {
					_id: {
						type: "string",
						description: "User identification number",
						example: "6201064b0028de7866e2b2c4",
					},
					username: {
						type: "string",
						description: "User's username",
						example: "Paultergeist",
					},
					email: {
						type: "string",
						format: "email",
						description: "User's email",
						example: "salchi@gmail.com",
					},
					profileImage: {
						type: "string",
						description: "URL to user's profile image",
						example: "uploads/profileImage-1623100000000-123456789.jpg",
					},
					role: {
						type: "string",
						enum: ["user", "admin"],
						description: "Role of the user",
						example: "user",
					},
					posts: {
						type: "array",
						items: {
							type: "string",
							description: "Post ID",
							example: "6201064b0028de7866e2b2c5",
						},
					},
					likedPosts: {
						type: "array",
						items: {
							type: "string",
							description: "Post ID liked by user",
							example: "6201064b0028de7866e2b2c6",
						},
					},
					followers: {
						type: "array",
						items: {
							type: "string",
							description: "User ID of follower",
							example: "6201064b0028de7866e2b2c7",
						},
					},
					following: {
						type: "array",
						items: {
							type: "string",
							description: "User ID of followed user",
							example: "6201064b0028de7866e2b2c8",
						},
					},
				},
				required: ["_id", "username", "email", "role"],
			},

			post: {
				type: "object",
				properties: {
					_id: {
						type: "string",
						description: "Post identification number",
						example: "6201064b0028de7866e2b2c5",
					},
					title: {
						type: "string",
						description: "Title of the post",
						example: "My first post",
					},
					content: {
						type: "string",
						description: "Content of the post",
						example: "This is the body text of my first post.",
					},
					image: {
						type: "string",
						description: "URL or path to post's image",
						example: "uploads/image-1623100000000-123456789.jpg",
					},
					commentIds: {
						type: "array",
						description: "Array of comment IDs related to the post",
						items: {
							type: "string",
							example: "6201064b0028de7866e2b2c9",
						},
					},
					likes: {
						type: "array",
						description: "Array of user IDs who liked the post",
						items: {
							type: "string",
							example: "6201064b0028de7866e2b2ca",
						},
					},
				},
				required: ["_id", "title", "content"],
			},

			comment: {
				type: "object",
				properties: {
					_id: {
						type: "string",
						description: "Comment identification number (MongoDB ObjectId)",
						example: "6201064b0028de7866e2b2d1",
					},
					postId: {
						type: "string",
						description: "ID of the post this comment belongs to",
						example: "6201064b0028de7866e2b2c5",
					},
					userId: {
						type: "string",
						description: "ID of the user who wrote the comment",
						example: "6201064b0028de7866e2b2c4",
					},
					content: {
						type: "string",
						description: "Text content of the comment",
						example: "This is a comment example",
					},
					image: {
						type: "string",
						description:
							"URL or path to an optional image attached to the comment",
						example: "uploads/comment-image-1623100000000-987654321.jpg",
					},
					likes: {
						type: "array",
						description: "Array of user IDs who liked the comment",
						items: {
							type: "string",
							example: "6201064b0028de7866e2b2ca",
						},
					},
				},
				required: ["_id", "postId", "userId", "content"],
			},
		},
	},
};
