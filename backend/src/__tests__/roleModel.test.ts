import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Role Model API", () => {
  it("should create a new role model", async () => {
    const res = await request(app)
      .post("/api/role-models") 
      .send({
        name: "Marie Curie",
        bio: "Scientist who pioneered research on radioactivity",
        description:
          "Marie Curie was a physicist and chemist who conducted pioneering research on radioactivity.",
        title: "Scientist",
        specName: "Physics",
        photoUrl: "http://example.com/marie-curie.jpg",
      });

    expect(res.statusCode).toEqual(201); 
    expect(res.body).toHaveProperty("name", "Marie Curie");
  });

  it("should get a list of role models", async () => {
    const res = await request(app).get("/api/role-models"); 
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
