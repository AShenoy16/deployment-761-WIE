import HighschoolRequirement from "../models/HighSchoolRequirements";

export const getAllHSRequirements = async () => {
  try {
    const hsRequirements = await HighschoolRequirement.find().select(
      "title requiredScore requirements"
    );
    return hsRequirements;
  } catch (error) {
    console.error("Error fetching multipliers:", error);
    throw error;
  }
};
