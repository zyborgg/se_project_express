const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

describe("GET /items", () =>
  it("should respond with a status 200", () =>
    request.get("/items").then(({ status, body }) => {
      expect(status).toBe(200);
      expect(Array.isArray(body.data)).toBe(true);
    })));

describe("POST /signup", () =>
  it("should create a user and return 201", () =>
    request
      .post("/signup")
      .send({
        name: "Test User",
        avatar: "https://example.com/avatar.png",
        email: "test@example.com",
        password: "StrongPass123!",
      })
      .then(({ status, body }) => {
        expect(status).toBe(201);
        expect(body.data).toHaveProperty("_id");
      })));

describe("POST /signin", () =>
  it("should return a token for valid credentials", () =>
    request
      .post("/signin")
      .send({ email: "test@example.com", password: "StrongPass123!" })
      .then(({ status, body }) => {
        expect(status).toBe(200);
        expect(body).toHaveProperty("token");
      })));

describe("GET /users/me", () =>
  it("should return user data when authorized", () =>
    request
      .post("/signin")
      .send({
        email: "test@example.com",
        password: "StrongPass123!",
      })
      .then(({ body }) => {
        const { token } = body;
        return request
          .get("/users/me")
          .set("Authorization", `Bearer ${token}`)
          .then(({ status, body: userBody }) => {
            expect(status).toBe(200);
            expect(userBody.data).toHaveProperty("_id");
          });
      })));
