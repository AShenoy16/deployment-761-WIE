import axios from "axios";
import { IRoleModel } from "../types/RoleModel";
import { addRoleModelType } from "../components/rolemodel/AddRoleModelModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
