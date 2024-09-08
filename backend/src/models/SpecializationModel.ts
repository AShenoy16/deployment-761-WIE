import mongoose, { Schema, model, Document } from 'mongoose';
import { Specialization } from './interfaces';
import TestimonialSchema from './TestimonalModel';


const SpecializationSchema = new Schema<Specialization>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  careerPathways: [{ type: String, required: true }],
  startingSalary: { type: Number, required: true },
  medianSalary: { type: Number, required: true },
  experiencedSalary: { type: Number, required: true },
  jobAvailability: { type: String, required: true },
  testimonials: [TestimonialSchema],
  header: { type: String, required: false }, 
  leftDetail: { type: String, required: false },
  rightDetail: { type: String, required: false },
  rightImage: { type: String, required: false },
  leftImage: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Specialization = mongoose.model<Specialization>('Specialization', SpecializationSchema);
export default Specialization;
