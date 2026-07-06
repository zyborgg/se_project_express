const supertest = require("supertest");
const app = require("../app.js");

const request = supertest(app);

describe("GET /items", () => {
  it("should respond with a status 200", () => {
    return request.get("/items").then((response) => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});

describe("POST /signup", () => {
  it("should create a user and return 201", () => {
    return request
      .post("/signup")
      .send({
        name: "Test User",
        avatar: "https://example.com/avatar.png",
        email: "test@example.com",
        password: "StrongPass123!",
      })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty("_id");
      });
  });
});

describe("POST /signin", () => {
  it("should return a token for valid credentials", () => {
    return request
      .post("/signin")
      .send({ email: "test@example.com", password: "StrongPass123!" })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
      });
  });
});

describe("GET /users/me", () => {
  it("should return user data when authorized", () => {
    return request
      .post("/signin")
      .send({
        email: "test@example.com",
        password: "StrongPass123!",
      })
      .then((loginRes) => {
        const token = loginRes.body.token;
        return request
          .get("/users/me")
          .set("Authorization", `Bearer ${token}`)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("_id");
          });
      });
  });
});
