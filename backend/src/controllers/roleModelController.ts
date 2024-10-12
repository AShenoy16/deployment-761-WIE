import { Request, Response } from "express";
import {
  deleteRoleModelById,
  getAllRoleModels,
  addRoleModel,
  updateRoleModel,
  getAllSpecRoleModels,
} from "../services/roleModelService";
import { IRoleModel } from "../models/interfaces";

/**
 * Retrieves all role models from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing all role models or an error message if retrieval fails.
 */
export const getRoleModels = async (req: Request, res: Response) => {
  try {
    // Fetch all role models from the database
    const roleModels = await getAllRoleModels();
    // Check if role models were successfully retrieved
    if (!roleModels) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve role models" });
    }
    // Return the list of role models
    return res.status(200).json(roleModels);
  } catch (error) {
    // Handle server error
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Adds a new role model to the database.
 * @param {Request} req - Express request object containing role model data in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the newly created role model or an error message if creation fails.
 */
export const addRoleModels = async (req: Request, res: Response) => {
  // Extract role model data from request body
  const roleModelData: IRoleModel = req.body;
  try {
    // Add a new role model to the database
    const newRoleModel = await addRoleModel(roleModelData);
    // Check if the role model was successfully created
    if (!newRoleModel) {
      return res.status(404).json({ message: "Failed to find role model" });
    }
    // Return the newly created role model
    return res.status(201).json(newRoleModel);
  } catch (error) {
    // Handle server error
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Deletes a role model by its ID.
 * @param {Request} req - Express request object containing role model ID in req.params.
 * @param {Response} res - Express response object.
 * @returns {Response} 204 status code on success or a 404 error if the role model is not found.
 */
export const deleteRoleModel = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Check if an ID is provided
  if (!id) {
    return res.status(400).json({ message: "Role model ID is required" });
  }

  try {
    // Delete the role model by ID
    const result = await deleteRoleModelById(id);
    // Check if the role model was found and deleted
    if (!result) {
      return res
        .status(404)
        .json({ message: "Role model not found with ID: ", id });
    }
    // Return a successful response with no content
    return res.status(204).send();
  } catch (error) {
    // Handle server error
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Updates a role model by its ID.
 * @param {Request} req - Express request object containing role model ID in req.params and updated data in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated role model or a 404 error if the role model is not found.
 */
export const putRoleModels = async (req: Request, res: Response) => {
  // Extract role model data from request body
  const roleModelData: IRoleModel = req.body;
  const { id } = req.params;

  // Check if an ID is provided
  if (!id) {
    return res.status(400).json({ message: "Role model ID is required" });
  }

  try {
    // Update the role model with the provided ID
    const updatedRoleModel = await updateRoleModel(id, roleModelData);
    // Check if the role model was found and updated
    if (!updatedRoleModel) {
      return res.status(404).json({ message: "Failed to find role model" });
    }
    // Return the updated role model
    return res.status(200).json(updatedRoleModel);
  } catch (error) {
    // Handle server error
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Retrieves all role models for a specific specialization.
 * @param {Request} req - Express request object containing specialization name in req.params.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the list of role models for the specialization or an error message if no models are found.
 */
export const getSpecRoleModels = async (req: Request, res: Response) => {
  try {
    // Extract specialization name from request parameters
    const { specName } = req.params;

    // Check if specName is provided and is a string
    if (!specName || typeof specName !== "string") {
      return res.status(401);
    }

    // Fetch role models associated with the given specialization name
    const specRoleModels = await getAllSpecRoleModels(specName);

    // Check if any role models are found for the specialization
    if (!specRoleModels || specRoleModels.length === 0) {
      return res.status(404).json({ message: "No Role Models in that Spec" });
    }

    // Return the list of role models for the specialization
    return res.status(200).json(specRoleModels);
  } catch (error) {
    // Handle server error
    return res.status(500).json({ message: "Server error", error });
  }
};
