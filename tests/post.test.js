const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

jest.mock("../middlewares/authentication", () => {
	const mongoose = require("mongoose");
	return (req, res, next) => {
		req.user = { _id: new mongoose.Types.ObjectId() };
		next();
	};
});

const request = require("supertest");
const app = require("../app");
const Post = require("../models/Post");

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongoServer.stop();
});

beforeEach(async () => {
	await Post.deleteMany();
});

describe("POST /posts/newPost", () => {
	it("should create new post successfully", async () => {
		const res = await request(app)
			.post("/posts/newPost")
			.send({
				title: "Test Title",
				content: "Test Content",
			})
			.expect(201);
		expect(res.body).toHaveProperty("_id");
		expect(res.body.title).toBe("Test Title");
		expect(res.body.content).toBe("Test Content");
	});
	it("should return 400 if title or content is missing", async () => {
		const res = await request(app)
			.post("/posts/newPost")
			.send({
				title: "Test Title",
			})
			.expect(400);
		expect(res.body.message).toBe("Title and content are required");
	});
});

describe("GET /posts", () => {
	it("should return all posts", async () => {
		await Post.create({ title: "Post1", content: "Cont1" });
		await Post.create({ title: "Post2", content: "Cont2" });

		const res = await request(app).get("/posts").expect(200);
		expect(res.body.length).toBe(2);
	});
});

describe("GET /posts/:_id", () => {
	it("should return a post by id", async () => {
		const post = await Post.create({ title: "PostID", content: "ContID" });
		const res = await request(app).get(`/posts/${post._id}`).expect(200);
		expect(res.body.title).toBe("PostID");
	});

	it("should handle not found id", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app).get(`/posts/${fakeId}`).expect(404);
		expect(res.body.message).toBe("Post not found");
	});
});

describe("GET /posts/title/:title", () => {
	it("should return posts matching the title", async () => {
		await Post.create({ title: "Hola mundo", content: "Contenido 1" });
		await Post.create({ title: "Adiós mundo", content: "Contenido 2" });

		const res = await request(app).get("/posts/title/mundo").expect(200);
		expect(res.body.length).toBe(2);
	});

	it("should return error 400 if title is too long", async () => {
		const longTitle = "a".repeat(21);
		const res = await request(app).get(`/posts/title/${longTitle}`).expect(400);
		expect(res.body.message).toBe("Title length exceeds limit");
	});
});

describe("PUT /posts/:_id", () => {
	it("should update an existing post", async () => {
		const post = await Post.create({ title: "Old", content: "Old content" });
		const res = await request(app)
			.put(`/posts/${post._id}`)
			.send({ title: "New", content: "New content" })
			.expect(200);

		expect(res.body.title).toBe("New");
		expect(res.body.content).toBe("New content");
	});

	it("should return 404 if post does not exist", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.put(`/posts/${fakeId}`)
			.send({ title: "New" })
			.expect(404);

		expect(res.body.message).toBe("Post not found");
	});
});

describe("DELETE /posts/:_id", () => {
	it("should delete an existing post", async () => {
		const post = await Post.create({ title: "To delete", content: "Content" });
		const res = await request(app).delete(`/posts/${post._id}`).expect(200);
		expect(res.body.message).toBe("Post deleted successfully");

		const found = await Post.findById(post._id);
		expect(found).toBeNull();
	});

	it("should return 404 if post does not exist", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app).delete(`/posts/${fakeId}`).expect(404);
		expect(res.body.message).toBe("Post not found");
	});
});
