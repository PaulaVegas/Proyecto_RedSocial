module.exports = {
	paths: {
		"/posts/newPost": {
			post: {
				tags: ["Posts"],
				summary: "Create a new post",
				description:
					"Authenticated user creates a new post with optional image.",
				operationId: "createPost",
				security: [{ ApiKeyAuth: [] }],
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								required: ["title", "content"],
								properties: {
									title: {
										type: "string",
										example: "My new post",
									},
									content: {
										type: "string",
										example: "This is the content of the post.",
									},
									image: {
										type: "string",
										format: "binary",
										description: "Optional image for the post",
									},
								},
							},
						},
					},
				},
				responses: {
					201: {
						description: "Post created successfully",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/Post",
								},
							},
						},
					},
					400: {
						description: "Missing required fields",
					},
					401: {
						description: "Unauthorized - Token missing or invalid",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},

		"/posts": {
			get: {
				tags: ["Posts"],
				summary: "Get all posts",
				description:
					"Retrieves all posts with pagination and embedded comments.",
				operationId: "getAllPosts",
				parameters: [
					{
						name: "page",
						in: "query",
						schema: { type: "integer", example: 1 },
						description: "Page number for pagination",
					},
					{
						name: "limit",
						in: "query",
						schema: { type: "integer", example: 10 },
						description: "Number of posts per page",
					},
				],
				responses: {
					200: {
						description: "List of posts with comments",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Post with comments:",
										},
										postsWithComments: {
											type: "array",
											items: {
												$ref: "#/components/schemas/Post",
											},
										},
									},
								},
							},
						},
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},

		"/posts/{_id}/like": {
			post: {
				tags: ["Posts"],
				summary: "Like a post",
				description: "Authenticated user gives a like to a specific post.",
				operationId: "likePost",
				security: [{ ApiKeyAuth: [] }],
				parameters: [
					{
						name: "_id",
						in: "path",
						required: true,
						description: "ID of the post to like",
						schema: {
							type: "string",
							example: "6600e8eecc1bb90cc2a6d8c9",
						},
					},
				],
				responses: {
					200: {
						description: "Post liked successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Post liked successfully",
										},
										likesCount: { type: "integer", example: 5 },
										post: {
											$ref: "#/components/schemas/Post",
										},
									},
								},
							},
						},
					},
					400: {
						description: "Post already liked",
					},
					404: {
						description: "Post not found",
					},
					401: {
						description: "Unauthorized - Token missing or invalid",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},
	},
};
