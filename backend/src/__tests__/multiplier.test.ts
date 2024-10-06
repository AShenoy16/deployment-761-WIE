import request from "supertest";
import app from "../app"; 
import * as MultiplierService from "../services/multiplierService"; 

jest.mock("../services/multiplierService"); 

describe("Multiplier Controller", () => {
  describe("GET /api/multiplier", () => {
    it("should return multiplier data", async () => {
      const mockMultiplierData = { value: 1.5 }; 
      (MultiplierService.getAllMultipliers as jest.Mock).mockResolvedValue([
        mockMultiplierData,
      ]);

      const response = await request(app).get("/api/multiplier");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockMultiplierData);
    });

    it("should return 404 if multipliers are not found", async () => {
      (MultiplierService.getAllMultipliers as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/api/multiplier");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Multipliers Not Found" });
    });

    it("should handle server errors", async () => {
      (MultiplierService.getAllMultipliers as jest.Mock).mockRejectedValue(
        new Error("Server error")
      );

      const response = await request(app).get("/api/multiplier");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Network error" });
    });
  });

  describe("PUT /api/multipliers", () => {
    it("should update multipliers successfully", async () => {
      const newMultiplier = { value: 2.0 }; 
      (MultiplierService.isValidMultiplier as jest.Mock).mockReturnValue(true); 
      (MultiplierService.updateMultiplier as jest.Mock).mockResolvedValue(true); 

      const response = await request(app)
        .put("/api/multiplier")
        .send(newMultiplier);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(newMultiplier);
    });

    it("should return 402 if the multiplier data is invalid", async () => {
      const invalidMultiplier = {}; 
      (MultiplierService.isValidMultiplier as jest.Mock).mockReturnValue(false);

      const response = await request(app)
        .put("/api/multiplier")
        .send(invalidMultiplier);

      expect(response.status).toBe(402);
      expect(response.body).toEqual({ message: "Incorrect Information" });
    });

    it("should return 404 if the multiplier is not found", async () => {
      const newMultiplier = { value: 2.0 }; 
      (MultiplierService.isValidMultiplier as jest.Mock).mockReturnValue(true); 
      (MultiplierService.updateMultiplier as jest.Mock).mockResolvedValue(
        false
      ); 

      const response = await request(app)
        .put("/api/multiplier")
        .send(newMultiplier);

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Multiplier not found" });
    });

    it("should handle server errors during update", async () => {
      const newMultiplier = { value: 2.0 }; 
      (MultiplierService.isValidMultiplier as jest.Mock).mockReturnValue(true); 
      (MultiplierService.updateMultiplier as jest.Mock).mockRejectedValue(
        new Error("Server error")
      );

      const response = await request(app)
        .put("/api/multiplier")
        .send(newMultiplier);

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Network error" });
    });
  });
});
