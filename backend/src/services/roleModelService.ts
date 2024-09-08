// services/roleModelService.ts
import RoleModel from "../models/RoleModel";
import { IRoleModel } from "../models/interfaces";

/**
 * Service to get all role models from the database
 * @returns Array of role models or null in case of error
 */
export const getAllRoleModels = async () => {
  try {
    // Fetch all role models from the database
    const roleModels = await RoleModel.find().exec();
    return roleModels;
  } catch (error) {
    console.error("Error fetching role models:", error);
    return null; // Return null if there is an error
  }
};

/**
 * Service to add a new role model
 * @param roleModelData Object containing the role model details
 * @returns The created role model or null in case of error
 */
export const addRoleModel = async (roleModelData: any) => {
  try {
    const newRoleModel = new RoleModel(roleModelData);
    await newRoleModel.save();
    return newRoleModel;
  } catch (error) {
    console.error("Error adding new role model:", error);
    return null;
  }
};

/**
 * Service to delete a role model
 * @param roleModelId String representing the role model ID
 * @returns
 */
export const deleteRoleModelById = async (roleModelId: string) => {
  try {
    const result = await RoleModel.findByIdAndDelete(roleModelId);
    return result;
  } catch (error) {
    console.error("Error deleting role model:", error);
    return null;
  }
};
