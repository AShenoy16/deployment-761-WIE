import mongoose, { Schema } from "mongoose";

const requirementSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  requiredScore: { type: Number, required: true },
  requirements: [{ type: String, required: true }], // Array of strings for requirements
});

const HighschoolRequirement = mongoose.model(
  "HighschoolRequirement",
  requirementSchema
);
export default HighschoolRequirement;
