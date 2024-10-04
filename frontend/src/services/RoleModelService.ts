import axios from "axios";
import { IRoleModel } from "../types/RoleModel";
import { addUpdateRoleModelType } from "../components/rolemodel/AddUpdateRoleModelModal";
import { API_BASE_URL } from "../util/common";

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
  newRoleModel: addUpdateRoleModelType
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

/**
 * Service to update role model object in the database by ID
 * @param roleModel role model object from user input
 * @returns updated role model object in the database
 */
export const putRoleModel = async (
  roleModel: addUpdateRoleModelType,
  roleModelId: string
): Promise<IRoleModel> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/role-models/${roleModelId}`,
      roleModel
    );
    const roleModelData: IRoleModel = response.data;
    return roleModelData;
  } catch (error) {
    console.error("Error updating role model:", error);
    throw error; // Throw the error so the query can handle it
  }
};
