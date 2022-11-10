const mongoose = require("mongoose");
const request = require("supertest");
require("dotenv").config();
const app = require("../../app");
const { User } = require("../../models/user/user");

const { DB_TEST_HOST, PORT } = process.env;
console.log('DB_TEST_HOST :>> ', DB_TEST_HOST);

describe("test register fuction", () => {
		let server;
		beforeAll(() => server = app.listen(PORT));
		afterAll(() => server.close());

		beforeEach((done) => {
			mongoose.connect(DB_TEST_HOST).then(() => done())
		})

		afterEach((done) => {
			mongoose.connection.db.dropCollection(() => {
				mongoose.connection.close(()=>done())
			})
		})
	
	test("test login route", async() => {
		const newUser = {
			email: "anton@gmail.com",
			password: "123456789"
		};

		const user = await User.create(newUser);

		const loginUser = {
			email: "anton@gmail.com",
			password: "123456789"
		}

		const response = await request(app).post("api/users/login").send(loginUser);
		expect(response.statusCode).toBe(200);
		const { body } = response;
		expect(body.token).toByTruthy();
		const { email } = body;
		expect(typeof email).toBe("string");
		const { subscription } = body;
		expect(typeof subscription).toBe("string");
		const { token } = await User.findById(user._id);
		expect(body.token).toBy(token);
	})
})