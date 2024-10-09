import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app"; 
import Specialization from "../models/SpecializationModel"; 

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Mock data for specializations with a testimonial
  await Specialization.create({
    name: "Mechanical Engineering",
    description: "Focuses on designing mechanical systems.",
    header: "Engineering the Future",
    careerPathways: ["Aerospace", "Automotive"],
    leftDetail: "Mechanical engineering focuses on ...",
    rightDetail: "It involves the design, analysis, and manufacturing...",
    testimonials: [
      {
        name: "John Doe",
        role: "Engineer",
        message: "Great specialization for aspiring engineers.",
        description: "An insightful journey through mechanical systems.", 
      },
    ],
    jobAvailability: "High",
    medianSalary: 75000,
    experiencedSalary: 120000,
    startingSalary: 50000,
    photoUrl: "/uploads/mechanical.jpg",
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Specialization API", () => {
  it("should fetch all specializations", async () => {
    const res = await request(app).get("/api/specializations");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name", "Mechanical Engineering");
  });

  it("should fetch a specialization by name", async () => {
    const res = await request(app).get(
      "/api/specializations/Mechanical Engineering"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Mechanical Engineering");
  });

  it("should update a specialization by name", async () => {
    const res = await request(app)
      .patch("/api/specializations/Mechanical Engineering") 
      .field("header", "Engineering the Future - Updated") 
      .field("jobAvailability", "Moderate") 
      .field("startingSalary", 52000) 
      .field("photoUrl", "/uploads/mechanical_updated.jpg"); 

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty(
      "header",
      "Engineering the Future - Updated"
    );
    expect(res.body).toHaveProperty("jobAvailability", "Moderate");
  });

  it("should fetch testimonials for a specialization", async () => {
    const res = await request(app).get(
      "/api/specializations/testimonials/Mechanical Engineering"
    );
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true); 
  });

  it("should add a testimonial to a specialization", async () => {
    const testimonial = {
      name: "Jane Doe",
      role: "Engineer",
      message: "This specialization helped me grow as a professional.",
      description: "An educational experience with hands-on learning.",
    };

    const res = await request(app)
      .post("/api/specializations/testimonials/Mechanical Engineering")
      .send(testimonial);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[1]).toHaveProperty("name", "Jane Doe");
  });

  it("should delete a testimonial by ID", async () => {
    // Fetch testimonials to get the testimonial ID
    const testimonialsRes = await request(app).get(
      "/api/specializations/testimonials/Mechanical Engineering"
    );
    const testimonialId = testimonialsRes.body[0]._id;

    // Delete the testimonial using the ID
    const deleteRes = await request(app).delete(
      `/api/specializations/testimonials/Mechanical Engineering/${testimonialId}`
    );
    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body).toHaveLength(1); 
  });
});
