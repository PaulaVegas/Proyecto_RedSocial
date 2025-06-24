module.exports = {
	paths: {
		"/comments": {
			post: {
				tags: ["Comments"],
				summary: "Create a new comment",
				description:
					"Authenticated user creates a comment with optional image.",
				operationId: "createComment",
				security: [{ ApiKeyAuth: [] }],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								required: ["postId", "content"],
								properties: {
									postId: {
										type: "string",
										description: "ID of the post",
										example: "6201064b0028de7866e2b2c5",
									},
									content: {
										type: "string",
										example: "This is my comment",
									},
									image: {
										type: "string",
										format: "binary",
										description: "Optional image for comment",
									},
								},
							},
						},
					},
				},
				responses: {
					201: {
						description: "Comment created successfully",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/Comment",
								},
							},
						},
					},
					400: { description: "Missing required fields" },
					401: { description: "Unauthorized" },
					404: { description: "Post not found" },
					500: { description: "Internal server error" },
				},
			},
			get: {
				tags: ["Comments"],
				summary: "Get all comments",
				description: "Retrieve all comments with user info.",
				operationId: "getAllComments",
				responses: {
					200: {
						description: "List of comments",
						content: {
							"application/json": {
								schema: {
									type: "array",
									items: { $ref: "#/components/schemas/Comment" },
								},
							},
						},
					},
					500: { description: "Internal server error" },
				},
			},
		},
		"/comments/{_id}/like": {
			post: {
				tags: ["Comments"],
				summary: "Like a comment",
				description: "Authenticated user likes a comment.",
				operationId: "likeComment",
				security: [{ ApiKeyAuth: [] }],
				parameters: [
					{
						name: "_id",
						in: "path",
						required: true,
						description: "ID of the comment to like",
						schema: { type: "string", example: "6201064b0028de7866e2b2c6" },
					},
				],
				responses: {
					200: {
						description: "Comment liked successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Comment liked successfully",
										},
										likesCount: { type: "integer", example: 5 },
										comment: { $ref: "#/components/schemas/Comment" },
									},
								},
							},
						},
					},
					400: { description: "Comment already liked" },
					404: { description: "Comment not found" },
					401: { description: "Unauthorized" },
					500: { description: "Internal server error" },
				},
			},
		},
	},
};
