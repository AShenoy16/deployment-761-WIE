import mongoose, { Schema, model } from "mongoose";
import { ITestimonial } from "./interfaces"; // Use the correct interface import

const TestimonialSchema = new Schema<ITestimonial>({
  testimonialId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default TestimonialSchema; // Export the schema instead of the model
