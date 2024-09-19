import { Specialization } from "../models/interfaces";
import SpecializationModel from "../models/SpecializationModel";

export const getSpecializationByName = async (
  name: string
): Promise<Specialization | null> => {
  // Case-insensitive search using regex with the 'i' flag
  const specialization = await SpecializationModel.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });

  return specialization;
};
