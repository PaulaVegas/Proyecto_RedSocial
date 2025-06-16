process.env.JWT_SECRET = "test_secret_key";

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");

jest.mock("../middlewares/authentication", () => {
	const mongoose = require("mongoose");
	return (req, res, next) => {
		req.user = { _id: new mongoose.Types.ObjectId() };
		next();
	};
});

const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Token = require("../models/Token");

const mockUser = {
	_id: "684fdd11669416c863b5af59",
	username: "mockuser",
	email: "mockuser@example.com",
	// ...otros campos que necesites
};
let mongoServer;
beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await mongoose.connect(uri);
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close(true);
	await mongoServer.stop();
});

beforeEach(async () => {
	await User.deleteMany();
	await Token.deleteMany();
});

describe("POST /users/register", () => {
	it("should create a new user", async () => {
		const res = await request(app)
			.post("/users/register")
			.send({ email: "test@example.com", password: "123456" });

		expect(res.statusCode).toBe(201);
		expect(res.body).toHaveProperty("user");
		expect(res.body.user).toHaveProperty("_id");
	});

	it("should return 400 if email or password is missing", async () => {
		const res = await request(app).post("/users/register").send({});
		expect(res.statusCode).toBe(400);
	});
});

describe("POST /users/login", () => {
	beforeEach(async () => {
		await request(app).post("/users/register").send({
			email: "login@example.com",
			password: "123456",
		});
	});

	it("should login the user and return a token", async () => {
		const res = await request(app).post("/users/login").send({
			email: "login@example.com",
			password: "123456",
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("token");
		expect(res.body).toHaveProperty("user");
		authToken = res.body.token;
		createdUser = res.body.user;
	});

	it("should return 404 for non-existing user", async () => {
		const res = await request(app).post("/users/login").send({
			email: "notfound@example.com",
			password: "123456",
		});

		expect(res.statusCode).toBe(404);
	});

	it("should return 401 for incorrect password", async () => {
		const res = await request(app).post("/users/login").send({
			email: "login@example.com",
			password: "wrongpass",
		});

		expect(res.statusCode).toBe(401);
	});
});

describe("GET /users", () => {
	it("should get all users", async () => {
		const res = await request(app).get("/users");
		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});
});

describe("GET /users/:_id", () => {
	it("should get a user by id", async () => {
		const user = await User.create({
			email: "one@example.com",
			password: "123456",
		});
		const res = await request(app).get(`/users/${user._id}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).not.toHaveProperty("password");
		expect(res.body._id).toBe(user._id.toString());
	});

	it("should return 404 if user not found", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app).get(`/users/${fakeId}`);
		expect(res.statusCode).toBe(404);
	});
});

describe("PUT /users/:_id", () => {
	it("should update a user", async () => {
		const user = await User.create({
			email: "update@example.com",
			password: "123456",
		});
		const res = await request(app)
			.put(`/users/${user._id}`)
			.send({ email: "updated@example.com" });

		expect(res.statusCode).toBe(200);
		expect(res.body.user.email).toBe("updated@example.com");
	});
	it("should return 404 if user does not exist", async () => {
		const fakeId = new mongoose.Types.ObjectId();
		const res = await request(app)
			.put(`/users/${fakeId}`)
			.send({ email: "doesnotexist@example.com" });

		expect(res.statusCode).toBe(404);
		expect(res.body.message).toBe("User not found");
	});
});

describe("DELETE /users/:_id", () => {
	it("should delete a user", async () => {
		const user = await User.create({
			email: "delete@example.com",
			password: "123456",
		});
		const res = await request(app).delete(`/users/${user._id}`);
		expect(res.statusCode).toBe(200);
	});
});

describe("DELETE /users/logout", () => {
	beforeEach(async () => {
		const res = await request(app).post("/users/register").send({
			email: "logout@example.com",
			password: "123456",
		});
		const loginRes = await request(app).post("/users/login").send({
			email: "logout@example.com",
			password: "123456",
		});
		authToken = loginRes.body.token;
	});

	it("should logout the user", async () => {
		const res = await request(app)
			.delete("/users/logout")
			.set("Authorization", `Bearer ${authToken}`);
		expect(res.statusCode).toBe(200);
	});

	it("should return 401 without token", async () => {
		const res = await request(app).delete("/users/logout");
		expect(res.statusCode).toBe(401);
	});
});
