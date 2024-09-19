import mongoose, { Schema, model } from "mongoose";
import { ITestimonial } from "./interfaces"; // Use the correct interface import

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Testimonial = model<ITestimonial>("RoleModel", TestimonialSchema);

export default Testimonial;
