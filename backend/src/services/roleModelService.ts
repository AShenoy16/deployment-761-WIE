import RoleModel from "../models/RoleModel";
import { IRoleModel } from "../models/interfaces";

/**
 * Service to fetch all role models from the database.
 * @returns {Promise<IRoleModel[] | null>} - Returns an array of role models or null in case of an error.
 */
export const getAllRoleModels = async () => {
  try {
    // Fetch all role models from the database
    const roleModels = await RoleModel.find().exec();
    return roleModels;
  } catch (error) {
    // Log error and return null if an exception occurs
    console.error("Error fetching role models:", error);
    return null;
  }
};

/**
 * Service to add a new role model to the database.
 * @param {IRoleModel} roleModelData - The role model data to be added.
 * @returns {Promise<IRoleModel | null>} - Returns the newly created role model or null if an error occurs.
 */
export const addRoleModel = async (roleModelData: IRoleModel) => {
  try {
    // Create a new RoleModel instance and save it to the database
    const newRoleModel = new RoleModel(roleModelData);
    await newRoleModel.save();
    return newRoleModel;
  } catch (error) {
    // Log error and return null if an exception occurs
    console.error("Error adding new role model:", error);
    return null;
  }
};

/**
 * Service to delete a role model by its ID.
 * @param {string} roleModelId - The ID of the role model to be deleted.
 * @returns {Promise<IRoleModel | null>} - Returns the deleted role model or null if an error occurs.
 */
export const deleteRoleModelById = async (roleModelId: string) => {
  try {
    // Find the role model by ID and delete it
    const result = await RoleModel.findByIdAndDelete(roleModelId);
    return result;
  } catch (error) {
    // Log error and return null if an exception occurs
    console.error("Error deleting role model:", error);
    return null;
  }
};

/**
 * Service to update an existing role model by its ID.
 * @param {string} id - The ID of the role model to update.
 * @param {IRoleModel} roleModelData - The new data to update the role model with.
 * @returns {Promise<IRoleModel | null>} - Returns the updated role model or null if an error occurs.
 */
export const updateRoleModel = async (
  id: string,
  roleModelData: IRoleModel
) => {
  try {
    // Find the role model by ID and update it with the new data
    const updatedRoleModel = await RoleModel.findByIdAndUpdate(
      id,
      roleModelData,
      { new: true, runValidators: true } // Returns the updated document
    );
    return updatedRoleModel;
  } catch (error) {
    // Log error and return null if an exception occurs
    console.error("Error updating role model:", error);
    return null;
  }
};

/**
 * Service to fetch all role models related to a specific specialization (spec).
 * Uses a case-insensitive regex to match the spec name.
 * @param {string} specName - The name of the specialization to filter role models by.
 * @returns {Promise<IRoleModel[] | null>} - Returns an array of role models or null if an error occurs.
 */
export const getAllSpecRoleModels = async (specName: string) => {
  try {
    // Validate that specName is a string
    if (typeof specName !== "string") {
      return null;
    }

    // Use regex to match role models for the provided spec name (case-insensitive)
    const specRoleModels = await RoleModel.find({
      specName: { $regex: specName, $options: "i" },
    });
    return specRoleModels;
  } catch (error) {
    // Log error and return null if an exception occurs
    console.error("Error fetching role models for spec:", error);
    return null;
  }
};
