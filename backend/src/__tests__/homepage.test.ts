import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import HomePage from "../models/HomepageModel"; 

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await HomePage.create({
    heroTitle: "Women in Engineering",
    heroSubtitle: "Towards more diversity in Engineering",
    heroImage: "/uploads/hero-image.jpg",
    section1Header: "Why Study Even Engineering?",
    section1Text:
      "Engineering is more than just solving problems—it’s about creating solutions.",
    section2Header: "Discover the Right Engineering Path for You",
    section2Text:
      "Engineering is diverse, offering various career pathways depending on your interests and strengths.",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Homepage API", () => {
  it("should get homepage data", async () => {
    const res = await request(app).get("/api/homepage"); 
    expect(res.statusCode).toEqual(200);
       expect(res.body).toHaveProperty("heroTitle", "Women in Engineering");
       expect(res.body).toHaveProperty(
         "heroSubtitle",
         "Towards more diversity in Engineering"
       );
       expect(res.body).toHaveProperty("heroImage", "/uploads/hero-image.jpg");
       expect(res.body).toHaveProperty(
         "section1Header",
         "Why Study Even Engineering?"
       );
       expect(res.body).toHaveProperty(
         "section1Text",
         "Engineering is more than just solving problems—it’s about creating solutions."
       );
       expect(res.body).toHaveProperty(
         "section2Header",
         "Discover the Right Engineering Path for You"
       );
       expect(res.body).toHaveProperty(
         "section2Text",
         "Engineering is diverse, offering various career pathways depending on your interests and strengths."
       );
  });
});
