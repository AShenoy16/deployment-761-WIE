import mongoose, { Schema, model } from "mongoose";
import { ITestimonial } from "./interfaces"; // Use the correct interface import

export const TestimonialSchema = new Schema<ITestimonial>({
  testimonialId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  TestimonialSchema
);
export default Testimonial; // Export the schema instead of the model
