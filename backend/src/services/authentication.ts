import { User } from "../models/userModel";

/**
 * Will login admin, by making sure admin user with valid creds in db
 * @param email 
 * @param password 
 * @returns 
 */
export const loginAdmin = async (email: string, password: string) => {
  try {
    const isAdmin = await fetchAdmin(email, password);

    if (!isAdmin) {
      return null;
    }

    return 1;
  } catch (error) {
    throw new Error("Failed to fetch admin");
  }
};

/**
 * get admin that matches email and password
 * @param email
 * @param password
 * @returns
 */
const fetchAdmin = async (email: string, password: string) => {
  try {
    const admin = await User.findOne({
      email: email,
      passwordHash: password,
      role: "admin",
    })
      .select("-createdAt -updatedAt -__v")
      .exec();

    return admin;
  } catch (error) {
    console.error("Error fetching admin:", error);
    throw new Error("Failed to fetch admin");
  }
};
