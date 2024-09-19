import { ITestimonial, ISpecialization } from "../models/interfaces";
import SpecializationModel from "../models/SpecializationModel";

export const getSpecializationByName = async (name: string) => {
  // Case-insensitive search using regex with the 'i' flag
  const specialization = await SpecializationModel.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });

  return specialization;
};

export const isTestimonial = (
  testimonial: any
): testimonial is ITestimonial => {
  return (
    typeof testimonial.name === "string" &&
    typeof testimonial.description === "string"
  );
};
