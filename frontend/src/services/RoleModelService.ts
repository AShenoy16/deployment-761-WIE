import axios from "axios";
import { IRoleModel } from "../types/RoleModel";
import { addRoleModelType } from "../components/rolemodel/AddUpdateRoleModelModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Service to send a get request for all role models
 * @returns an array of role models objects
 */
export const getRoleModels = async (): Promise<IRoleModel[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/role-models`);
    const roleModels = response.data;
    return roleModels;
  } catch (error) {
    console.error("Error retrieving role models:", error);
    throw error; // Throw the error so the query can handle it
  }
};

/**
 * Service to send a post request to create a new role model object
 * @param newRoleModel role model object to be created
 * @returns the role model object added to the database
 */
export const postRoleModel = async (
  newRoleModel: addRoleModelType
): Promise<IRoleModel> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/role-models`,
      newRoleModel
    );
    const roleModelData: IRoleModel = response.data;
    return roleModelData;
  } catch (error) {
    console.error("Error retrieving role models:", error);
    throw error; // Throw the error so the query can handle it
  }
};

/**
 * Service to send a delete request to delete a role model object in the database by ID
 * @param roleModelId role model object ID
 */
export const deleteRoleModel = async (roleModelId: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/role-models/${roleModelId}`);
  } catch (error) {
    console.error("Error deleting role model:", error);
    throw error; // Throw the error so the query can handle it
  }
};
