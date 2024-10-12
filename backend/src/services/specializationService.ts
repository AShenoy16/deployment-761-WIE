import { ITestimonial } from "../models/interfaces";
import SpecializationModel from "../models/SpecializationModel";

/**
 * Service to fetch a specialization by its name.
 * Performs a case-insensitive search using a regular expression.
 * @param {string} name - The name of the specialization to search for.
 * @returns {Promise<ISpecialization | null>} - Returns the specialization document or null if not found.
 */
export const getSpecializationByName = async (name: string) => {
  // Case-insensitive search using regex with the 'i' flag for name matching
  const specialization = await SpecializationModel.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });

  // Return the found specialization or null if none is found
  return specialization;
};

/**
 * Type guard to check if an object is a valid testimonial.
 * Ensures the object has the required properties of a testimonial.
 * @param {any} testimonial - The object to validate.
 * @returns {boolean} - Returns true if the object is a valid testimonial, otherwise false.
 */
export const isTestimonial = (
  testimonial: any
): testimonial is ITestimonial => {
  // Check if the testimonial has a valid name and description (both must be strings)
  return (
    typeof testimonial.name === "string" &&
    typeof testimonial.description === "string"
  );
};
