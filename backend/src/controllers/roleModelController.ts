import { Request, Response } from "express";
import { getAllRoleModels } from "../services/roleModelService";
import { addRoleModel } from "../services/roleModelService";

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
  const roleModelData = req.body;
  try {
    const newRoleModel = await addRoleModel(roleModelData);
    if (!newRoleModel) {
      return res.status(500).json({ message: "Failed to add role model" });
    }
    return res.status(201).json(newRoleModel);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
