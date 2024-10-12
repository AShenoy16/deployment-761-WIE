import { User } from "../models/userModel";
import bcrypt from "bcrypt";

/**
 * Logs in an admin by verifying the email and password credentials.
 * @param {string} email - The email address of the admin attempting to log in.
 * @param {string} password - The password provided by the admin.
 * @returns {Promise<number | null>} - Returns `1` if the admin is successfully authenticated, or `null` if authentication fails.
 * @throws {Error} - Throws an error if there is a failure in fetching the admin data.
 */
export const loginAdmin = async (email: string, password: string) => {
  try {
    // Check if the admin's credentials match
    const isAdmin = await fetchAdmin(email, password);

    // If no admin is found or password does not match, return null
    if (!isAdmin) {
      return null;
    }

    // Return a success response (1) if admin is authenticated
    return 1;
  } catch (error) {
    // Throw an error if the admin data cannot be fetched
    throw new Error("Failed to fetch admin");
  }
};

/**
 * Fetches an admin user from the database by matching the provided email and password.
 * @param {string} email - The email of the admin to be fetched.
 * @param {string} password - The plain text password to verify against the stored hashed password.
 * @returns {Promise<User | null>} - Returns the admin object if authenticated, or `null` if the email or password is incorrect.
 * @throws {Error} - Throws an error if fetching the admin fails.
 */
const fetchAdmin = async (email: string, password: string) => {
  try {
    // Find the admin user in the database by email and role
    const admin = await User.findOne({
      email: email,
      role: "admin",
    });

    // If no admin user is found, return null
    if (!admin) {
      return null;
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, admin.passwordHash);

    // If passwords do not match, return null
    if (!match) return null;

    // Return the admin user if credentials match
    return admin;
  } catch (error) {
    // Log the error and throw a new error if fetching the admin fails
    console.error("Error fetching admin:", error);
    throw new Error("Failed to fetch admin");
  }
};
