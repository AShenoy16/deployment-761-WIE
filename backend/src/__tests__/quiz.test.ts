import request from "supertest";
import app from "../app"; 
import { getSpecQuiz } from "../services/quizService"; 

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
});
