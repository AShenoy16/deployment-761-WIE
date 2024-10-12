import { Request, Response } from "express";
import { loginAdmin } from "../services/authentication";

/**
 * Endpoint to log in a user (admin login)
 * This function handles the login process for administrators by validating their email and password.
 *
 * @param req - Express Request object containing email and password in the body
 * @param res - Express Response object to send back the status and response
 * @returns 200 if successful, otherwise 401 or 500
 */
export const loginUsers = async (req: Request, res: Response) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Use the loginAdmin service to authenticate the admin with email and password
    const admin = await loginAdmin(email, password);

    // If authentication fails, respond with 401 Unauthorized
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // If successful, respond with a 200 OK status
    return res.status(200).json();
  } catch (error) {
    // Catch any errors that occur during the process and return 500 Internal Server Error
    return res.status(500);
  }
};
