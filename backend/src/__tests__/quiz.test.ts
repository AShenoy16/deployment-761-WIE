import request from "supertest";
import app from "../app"; 
import { getSpecQuiz } from "../services/quizService"; 
import * as QuizService from "../services/quizService"; // Adjust the import to your service

jest.mock("../services/quizService");

describe("Quiz Controller", () => {
  describe("GET /api/quiz/:id", () => {
    it("should return the specified quiz", async () => {
      const mockQuiz = [
        { _id: "2", title: "Second Quiz" },
        { _id: "1", title: "First Quiz" },
      ];

      // Mock the service to return a quiz
      (getSpecQuiz as jest.Mock).mockResolvedValue(mockQuiz);

      const response = await request(app).get("/api/quizzes"); 
      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        mockQuiz.sort((a, b) =>
          a._id.toString().localeCompare(b._id.toString())
        )
      ); // Check if the response body is sorted
    });

    it("should return 404 if quiz not found", async () => {
      // Mock the service to return null (no quiz found)
      (getSpecQuiz as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/quizzes"); 
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Quiz Not Found" });
    });
  });
    
    
  describe("POST /api/quizzes", () => {
    it("should return 400 if questionType is invalid", async () => {
      const invalidQuiz = {}; // Missing questionType
      const response = await request(app)
        .post("/api/quizzes")
        .send(invalidQuiz);

      // Expecting a 400 response due to missing questionType
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Quiz question data are required.",
      });
    });
  });

});
