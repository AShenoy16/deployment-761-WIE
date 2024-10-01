import axios from "axios";
import { IHighschoolRequirement } from "../types/HighschoolRequirements";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchHighschoolRequirements = async (): Promise<
  IHighschoolRequirement[]
> => {
  const response = await axios.get(`${API_BASE_URL}/highschool-requirements`);
  return response.data;
};
