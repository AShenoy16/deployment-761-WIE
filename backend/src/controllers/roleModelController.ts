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
 * Controller to get all role models from the database and return to client
 */
export const getRoleModels = async (req: Request, res: Response) => {
  try {
    const roleModels = await getAllRoleModels();
    if (!roleModels) {
      return res
        .status(500)
        .json({ message: "Failed to retrieve role models" });
    }
    return res.status(200).json(roleModels);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Controller to add a new role model
 */
export const addRoleModels = async (req: Request, res: Response) => {
  const roleModelData: IRoleModel = req.body;
  try {
    const newRoleModel = await addRoleModel(roleModelData);
    if (!newRoleModel) {
      return res.status(404).json({ message: "Failed to find role model" });
    }
    return res.status(201).json(newRoleModel);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Controller to delete a role model
 */
export const deleteRoleModel = async (req: Request, res: Response) => {
  const { roleModelId } = req.params;

  if (!roleModelId) {
    return res.status(400).json({ message: "Role model ID is required" });
  }

  try {
    const result = await deleteRoleModelById(roleModelId);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Role model not found with ID: ", roleModelId });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Controller to update a role model
 */
export const putRoleModels = async (req: Request, res: Response) => {
  const roleModelData: IRoleModel = req.body;
  const { roleModelId } = req.params;

  if (!roleModelId) {
    return res.status(400).json({ message: "Role model ID is required" });
  }

  try {
    const updatedRoleModel = await updateRoleModel(roleModelId, roleModelData);
    if (!updatedRoleModel) {
      return res.status(404).json({ message: "Failed to find role model" });
    }
    return res.status(200).json(updatedRoleModel);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Controller to get all role models based on spec name
 * @param res 
 * @returns 
 */
export const getSpecRoleModels = async (req: Request, res: Response) => {
  try {

    const {specName} = req.params

    if(!specName || typeof(specName) !== "string"){
      return res.status(401)
    }

    const specRoleModels = await getAllSpecRoleModels(specName)

    if(!specRoleModels || specRoleModels.length === 0){
      return res.status(404).json({message: "No Role Models in that Spec"})
    }

    return res.status(200).json(specRoleModels);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
