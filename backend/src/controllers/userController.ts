import { Request, Response } from "express";
import { loginAdmin } from "../services/authentication";

export const getUsers = async (req: Request, res: Response) => {
  return res.status(200).json({ message: "create user endpoints" });
};

/**
 * Endpoint to login user
 * @param req 
 * @param res 
 * @returns 
 */
export const loginUsers = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await loginAdmin(email, password);

    if (!admin) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(500);
  }
};
