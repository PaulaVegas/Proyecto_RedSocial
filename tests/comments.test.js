process.env.JWT_SECRET = "test_secret_key";

const mongoose = require("mongoose");
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");

jest.mock("../middlewares/authentication", () => {
	const mongoose = require("mongoose");
	return (req, res, next) => {
		req.user = { _id: new mongoose.Types.ObjectId() };
		next();
	};
});

const app = require("../app");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");

let mongoServer;
let user;
let post;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	await mongoose.connect(mongoServer.getUri());

	// Crear usuario y post para comentarios
	user = await User.create({
		email: "commenter@example.com",
		password: "123456",
	});

	post = await Post.create({
		title: "Test Post",
		content: "This is a test post",
		userId: user._id,
	});
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

beforeEach(async () => {
	await Comment.deleteMany();
});

describe("POST /comments", () => {
	it("should create a comment", async () => {
		const res = await request(app).post("/comments").send({
			postId: post._id,
			content: "This is a comment",
		});

		expect(res.statusCode).toBe(201);
		expect(res.body).toHaveProperty("_id");
		expect(res.body.content).toBe("This is a comment");
	});
	it("should return 400 if postId or content is missing", async () => {
		const res = await request(app).post("/comments").send({});
		expect(res.statusCode).toBe(400);
	});
	it("should return 404 if post does not exist", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app).post("/comments").send({
			postId: fakeId,
			content: "Test",
		});
		expect(res.statusCode).toBe(404);
	});
});

describe("GET /comments", () => {
	it("should get all comments", async () => {
		await Comment.create({
			postId: post._id,
			userId: user._id,
			content: "Comment 1",
		});
		const res = await request(app).get("/comments");
		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThan(0);
	});
});

describe("PUT /comments/:_id", () => {
	it("should update a comment", async () => {
		const comment = await Comment.create({
			postId: post._id,
			userId: user._id,
			content: "Old content",
		});

		const res = await request(app)
			.put(`/comments/${comment._id}`)
			.send({ content: "Updated content" });

		expect(res.statusCode).toBe(200);
		expect(res.body.content).toBe("Updated content");
	});

	it("should return 404 if comment not found", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.put(`/comments/${fakeId}`)
			.send({ content: "Anything" });

		expect(res.statusCode).toBe(404);
	});
});

describe("DELETE /comments/:_id", () => {
	it("should delete a comment", async () => {
		const comment = await Comment.create({
			postId: post._id,
			userId: user._id,
			content: "To delete",
		});

		const res = await request(app).delete(`/comments/${comment._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe("Comment deleted successfully");
	});

	it("should return 404 if comment not found", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app).delete(`/comments/${fakeId}`);
		expect(res.statusCode).toBe(404);
	});
});
