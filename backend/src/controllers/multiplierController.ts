import { Request, Response } from "express";
import {
  getAllMultipliers,
  isValidMultiplier,
  updateMultiplier,
} from "../services/multiplierService";
import { IMultiplierData } from "../models/interfaces";

/**
 * Retrieves and returns the multiplier information.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the first multiplier data or a 404 error if not found.
 */
export const getMultipliers = async (req: Request, res: Response) => {
  try {
    // Fetch all multiplier data from the service
    const multiplier = await getAllMultipliers();

    // If no multiplier data is found, return a 404 error
    if (!multiplier) {
      return res.status(404).send({ message: "Multipliers Not Found" });
    }

    // Return the first multiplier in the array
    return res.status(200).json(multiplier[0]);
  } catch (error) {
    // Handle any server/network error
    return res.status(500).json({ message: "Network error" });
  }
};

/**
 * Updates the multiplier with new data.
 * @param {Request} req - Express request object containing the new multiplier data in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated multiplier data or a 404 error if the multiplier is not found.
 */
export const updateMultipliers = async (req: Request, res: Response) => {
  try {
    // Extract new multiplier data from the request body
    const newMultiplier: IMultiplierData = req.body;

    // Validate the new multiplier data
    if (!newMultiplier || !isValidMultiplier(newMultiplier)) {
      return res.status(402).send({ message: "Incorrect Information" });
    }

    // Update the multiplier with the provided data
    const result = await updateMultiplier(newMultiplier);

    // If the multiplier update fails, return a 404 error
    if (!result) {
      return res.status(404).send({ message: "Multiplier not found" });
    }

    // Return the updated multiplier data
    return res.status(200).json(newMultiplier);
  } catch (error) {
    // Handle any server/network error
    return res.status(500).json({ message: "Network error" });
  }
};
