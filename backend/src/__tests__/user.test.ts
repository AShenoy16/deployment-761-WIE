import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app"; // Assuming you have an Express app exported from app.ts
import { User } from "../models/userModel"; // Assuming the user model is in userModel.ts
import * as authService from "../services/authentication"; // Mock the login service

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Insert mock data for users
  await User.create({
    email: "admin@example.com",
    passwordHash: "hashedpassword123",
    role: "admin",
    sessionId: "session123",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User API", () => {
  it("should return a message when fetching users", async () => {
    const res = await request(app).get("/api/users"); // Check the route
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "create user endpoints");
  });

  it("should return 401 if login fails", async () => {
    // Mock login failure (return null)
    jest.spyOn(authService, "loginAdmin").mockResolvedValue(null);

    const res = await request(app)
      .post("/api/users")
      .send({ email: "invalid@example.com", password: "wrongpassword" });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Unauthorized access");
  });

  it("should login successfully with correct credentials", async () => {
    // Mock login success (return 1)
    jest.spyOn(authService, "loginAdmin").mockResolvedValue(1);

    const res = await request(app)
      .post("/api/users")
      .send({ email: "admin@example.com", password: "password123" });

    expect(res.statusCode).toEqual(200);
  });

  
});
