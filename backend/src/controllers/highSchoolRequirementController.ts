import { Request, Response } from "express";
import { IHighschoolRequirement } from "../models/interfaces";
import {
  getAllHSRequirements,
  isValidHSRequirement,
  updateAllHSRequirements,
} from "../services/highSchoolRequirementService";

/**
 * Retrieves all high school requirements from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the list of high school requirements or a 404 error if none are found.
 */
export const getHSRequirements = async (req: Request, res: Response) => {
  try {
    // Fetch all high school requirements from the service
    const hsReq = await getAllHSRequirements();

    // If no high school requirements are found, return a 404 error
    if (!hsReq) {
      return res
        .status(404)
        .send({ message: "High School Requirements Not Found" });
    }

    // Return the high school requirements
    return res.status(200).json(hsReq);
  } catch (error) {
    // Handle any server/network error
    return res.status(500).json({ message: "Network error" });
  }
};

/**
 * Updates all high school requirements with new data.
 * @param {Request} req - Express request object containing the updated high school requirements in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing a success message if updated, or an error message for invalid data or failed updates.
 */
export const updateHSRequirements = async (req: Request, res: Response) => {
  try {
    // Extract new high school requirement data from the request body
    const newHSRequirement: IHighschoolRequirement[] = req.body;

    // Validate the new high school requirement data
    if (!newHSRequirement || !isValidHSRequirement(newHSRequirement)) {
      return res.status(403).send({ message: "Incorrect Information" });
    }

    // Update the high school requirements with the provided data
    const result = await updateAllHSRequirements(newHSRequirement);
    console.log(result);

    // If the update fails, return a 404 error
    if (!result) {
      return res.status(404).send({ message: "HS requirement not found" });
    }

    // Return a success message
    return res
      .status(200)
      .json({ message: "HS requirements updated successfully" });
  } catch (error) {
    // Handle any server/network error
    return res.status(500).json({ message: "Network error" });
  }
};
