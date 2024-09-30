import HighschoolRequirement from "../models/HighSchoolRequirements";
import { IHighschoolRequirement } from "../models/interfaces";

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

// validate type of data to ensure it is correct
export const isValidHSRequirement = (
  hsRequirements: IHighschoolRequirement[]
): boolean => {
  // Check for each requirement in the array
  for (const requirement of hsRequirements) {
    // Check if all fields have the correct types
    if (
      typeof requirement._id !== "string" ||
      typeof requirement.title !== "string" ||
      typeof requirement.requiredScore !== "number" ||
      !Array.isArray(requirement.requirements) ||
      !requirement.requirements.every((req) => typeof req === "string")
    ) {
      return false; // Return false if any validation fails
    }
  }

  return true; // Return true if all checks pass
};



