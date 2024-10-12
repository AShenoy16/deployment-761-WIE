import { IMultiplierData } from "../models/interfaces";
import MultiplierData from "../models/multiplerModel";

/**
 * Fetches all multiplier data from the database.
 * Only selects specific fields: `_id`, `rank3Multiplier`, `rank2Multiplier`, and `sliderFactor`.
 * @returns {Promise<IMultiplierData[]>} - Returns a promise that resolves to an array of multiplier data.
 * @throws {Error} - Throws an error if there is an issue with the database query.
 */
export const getAllMultipliers = async () => {
  try {
    // Fetch all multipliers from the database, selecting specific fields
    const multipliers = await MultiplierData.find().select(
      "_id rank3Multiplier rank2Multiplier sliderFactor"
    );
    return multipliers;
  } catch (error) {
    // Log and rethrow the error if fetching fails
    console.error("Error fetching multipliers:", error);
    throw error;
  }
};

/**
 * Validates that the provided multiplier data is correctly structured.
 * Ensures that the fields have the correct types.
 * @param {IMultiplierData} multiplier - The multiplier object to validate.
 * @returns {boolean} - Returns `true` if the multiplier data is valid, otherwise `false`.
 */
export const isValidMultiplier = (multiplier: IMultiplierData): boolean => {
  // Validate that all necessary fields are of the correct type
  return (
    typeof multiplier._id === "string" &&
    typeof multiplier.rank2Multiplier === "number" &&
    typeof multiplier.rank3Multiplier === "number" &&
    typeof multiplier.sliderFactor === "number"
  );
};

/**
 * Updates the multiplier data in the database with new values.
 * Finds the document by `_id` and updates the `rank2Multiplier`, `rank3Multiplier`, and `sliderFactor` fields.
 * @param {IMultiplierData} newMultiplier - The new multiplier data to update in the database.
 * @returns {Promise<IMultiplierData | null>} - Returns a promise that resolves to the updated multiplier document, or `null` if not found.
 * @throws {Error} - Throws an error if the update operation fails.
 */
export const updateMultiplier = async (newMultiplier: IMultiplierData) => {
  try {
    // Update the multiplier document by its ID with the new data
    const updatedMultiplier = await MultiplierData.findByIdAndUpdate(
      newMultiplier._id,
      {
        $set: {
          rank2Multiplier: newMultiplier.rank2Multiplier,
          rank3Multiplier: newMultiplier.rank3Multiplier,
          sliderFactor: newMultiplier.sliderFactor,
        },
      },
      { new: true } // Return the updated document
    );

    // Return the updated multiplier document
    return updatedMultiplier;
  } catch (error) {
    // Log and rethrow the error if updating fails
    console.error("Error updating multipliers:", error);
    throw error;
  }
};
