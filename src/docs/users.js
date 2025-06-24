module.exports = {
	paths: {
		"/register": {
			post: {
				tags: ["Users"],
				summary: "Register a new user",
				description: "Create a new user account with an image.",
				operationId: "registerUser",
				requestBody: {
					required: true,
					content: {
						"multipart/form-data": {
							schema: {
								type: "object",
								properties: {
									username: {
										type: "string",
										description: "Username of the user",
										example: "john_doe",
									},
									email: {
										type: "string",
										format: "email",
										description: "Email address of the user",
										example: "salchi@gmail.com",
									},
									password: {
										type: "string",
										description: "Password for the user account",
										example: "securepassword123",
									},
									image: {
										type: "string",
										format: "binary",
										description: "Profile image of the user",
									},
								},
								required: ["username", "email", "password"],
							},
						},
					},
				},
				responses: {
					201: {
						description: "User registered successfully",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "User registered successfully",
										},
										user: {
											$ref: "#/components/schemas/user",
										},
									},
								},
							},
						},
					},
					400: {
						description: "Bad Request - Invalid input data",
					},
					500: {
						description: "Internal Server Error",
					},
				},
			},
		},
		"/": {
			get: {
				tags: ["Users"],
				summary: "Get all users",
				description:
					"Retrieve a list of all users excluding passwords and tokens, populating their posts (id, title, content). Requires authentication.",
				security: [
					{
						ApiKeyAuth: [],
					},
				],
				responses: {
					200: {
						description: "List of users retrieved successfully",
						content: {
							"application/json": {
								schema: {
									type: "array",
									items: {
										type: "object",
										properties: {
											_id: {
												type: "string",
												example: "6201064b0028de7866e2b2c4",
											},
											username: {
												type: "string",
												example: "Paultergeist",
											},
											email: {
												type: "string",
												format: "email",
												example: "salchi@gmail.com",
											},
											profileImage: {
												type: "string",
												example:
													"uploads/profileImage-1623100000000-123456789.jpg",
											},
											role: {
												type: "string",
												enum: ["user", "admin"],
												example: "user",
											},
											posts: {
												type: "array",
												items: {
													type: "object",
													properties: {
														_id: {
															type: "string",
															example: "6201064b0028de7866e2b2c5",
														},
														title: {
															type: "string",
															example: "My first post",
														},
														content: {
															type: "string",
															example:
																"This is the body text of my first post.",
														},
													},
												},
											},
											followers: {
												type: "array",
												items: {
													type: "string",
													example: "6201064b0028de7866e2b2c7",
												},
											},
											following: {
												type: "array",
												items: {
													type: "string",
													example: "6201064b0028de7866e2b2c8",
												},
											},
											likedPosts: {
												type: "array",
												items: {
													type: "string",
													example: "6201064b0028de7866e2b2c6",
												},
											},
											createdAt: {
												type: "string",
												format: "date-time",
												example: "2022-02-23T15:00:00Z",
											},
											updatedAt: {
												type: "string",
												format: "date-time",
												example: "2022-02-23T15:00:00Z",
											},
										},
									},
								},
							},
						},
					},
					401: {
						description: "Unauthorized - Missing or invalid token",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},
		"/login": {
			post: {
				tags: ["Users"],
				summary: "User login",
				description:
					"Authenticate user with email and password, returns a JWT token on success.",
				operationId: "loginUser",
				requestBody: {
					required: true,
					content: {
						"application/json": {
							schema: {
								type: "object",
								required: ["email", "password"],
								properties: {
									email: {
										type: "string",
										format: "email",
										example: "salchi@gmail.com",
										description: "User email",
									},
									password: {
										type: "string",
										example: "securepassword123",
										description: "User password",
									},
								},
							},
						},
					},
				},
				responses: {
					200: {
						description: "Successful login",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Welcome, Paultergeist",
										},
										token: {
											type: "string",
											example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Invalid user or password",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Invalid user or password, try again",
										},
									},
								},
							},
						},
					},
					404: {
						description: "User not found",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: { type: "string", example: "User not found" },
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

		"/info": {
			get: {
				tags: ["Users"],
				summary: "Get authenticated user info",
				description:
					"Returns detailed information of the logged-in user including posts, likedPosts and followers. Requires authentication.",
				security: [{ ApiKeyAuth: [] }],
				responses: {
					200: {
						description: "User info retrieved successfully",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/user",
								},
							},
						},
					},
					401: {
						description: "Unauthorized - Missing or invalid token",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},

		"/{_id}/follow": {
			post: {
				tags: ["Users"],
				summary: "Follow a user by ID",
				description:
					"Authenticated user follows another user identified by _id.",
				security: [{ ApiKeyAuth: [] }],
				parameters: [
					{
						name: "_id",
						in: "path",
						required: true,
						description: "ID of the user to follow",
						schema: {
							type: "string",
							example: "6201064b0028de7866e2b2c4",
						},
					},
				],
				responses: {
					200: {
						description: "Successfully followed the user",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "You are now following Paultergeist",
										},
										user: {
											$ref: "#/components/schemas/user",
										},
									},
								},
							},
						},
					},
					400: {
						description: "Already following this user",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "Already following this user",
										},
									},
								},
							},
						},
					},
					404: {
						description: "User not found",
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										message: {
											type: "string",
											example: "User not found",
										},
									},
								},
							},
						},
					},
					401: {
						description: "Unauthorized - Missing or invalid token",
					},
					500: {
						description: "Internal server error",
					},
				},
			},
		},
	},
};
