import Specialization from "../models/SpecializationModel";

export const getSpecializationByName = async (name: string) => {
  // Case-insensitive search using regex with the 'i' flag
  const specialization = await Specialization.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });

  return specialization;
};
