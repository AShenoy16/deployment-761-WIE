import HighschoolRequirement from "../models/HighSchoolRequirements";
import { IHighschoolRequirement } from "../models/interfaces";

/**
 * Fetches all high school requirements from the database.
 * Selects only the "title", "requiredScore", and "requirements" fields for each document.
 * @returns {Promise<IHighschoolRequirement[]>} - Returns a promise that resolves to an array of high school requirements.
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
export const getAllHSRequirements = async () => {
  try {
    // Fetch all high school requirements with selected fields
    const hsRequirements = await HighschoolRequirement.find().select(
      "title requiredScore requirements"
    );
    return hsRequirements;
  } catch (error) {
    // Log and throw error if fetching fails
    console.error("Error fetching high school requirements:", error);
    throw error;
  }
};

/**
 * Validates that the provided high school requirements data is correctly structured.
 * Ensures that each requirement object has the correct field types.
 * @param {IHighschoolRequirement[]} hsRequirements - Array of high school requirement objects to validate.
 * @returns {boolean} - Returns `true` if all requirements are valid, otherwise returns `false`.
 */
export const isValidHSRequirement = (
  hsRequirements: IHighschoolRequirement[]
): boolean => {
  // Check for each requirement in the array
  for (const requirement of hsRequirements) {
    // Ensure each field has the correct type
    if (
      typeof requirement._id !== "string" || // _id must be a string
      typeof requirement.title !== "string" || // title must be a string
      typeof requirement.requiredScore !== "number" || // requiredScore must be a number
      !Array.isArray(requirement.requirements) || // requirements must be an array
      !requirement.requirements.every((req) => typeof req === "string") // each element in requirements must be a string
    ) {
      return false; // Return false if any validation fails
    }
  }

  return true; // Return true if all checks pass
};

/**
 * Updates all provided high school requirements in the database.
 * For each requirement, it finds the corresponding document by `_id` and updates its fields.
 * @param {IHighschoolRequirement[]} updatedRequirements - Array of high school requirements to update.
 * @returns {Promise<IHighschoolRequirement[]>} - Returns a promise that resolves to an array of updated high school requirement documents.
 * @throws {Error} - Throws an error if any of the update operations fail.
 */
export const updateAllHSRequirements = async (
  updatedRequirements: IHighschoolRequirement[]
) => {
  try {
    // Create an array of update promises for each requirement
    const updatePromises = updatedRequirements.map(async (requirement) => {
      return await HighschoolRequirement.findByIdAndUpdate(
        requirement._id, // Find by ID
        {
          $set: {
            title: requirement.title, // Update title
            requiredScore: requirement.requiredScore, // Update requiredScore
            requirements: requirement.requirements, // Update requirements array
          },
        },
        { new: true } // Return the updated document
      );
    });

    // Wait for all update operations to complete
    const updatedDocs = await Promise.all(updatePromises);

    // Return the array of updated documents
    return updatedDocs;
  } catch (error) {
    // Log and throw error if updating fails
    console.error("Error updating multiple high school requirements:", error);
    throw error;
  }
};
