import mongoose, { Schema, model } from "mongoose";
import { IRoleModel } from "./interfaces";

const SocialMediaLinksSchema: Schema = new Schema({
  linkedin: { type: String },
});

const RoleModelSchema: Schema = new Schema<IRoleModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bio: { type: String, required: true },
  photoUrl: { type: String, required: true },
  socialMediaLinks: { type: SocialMediaLinksSchema },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const RoleModel = model<IRoleModel>("RoleModel", RoleModelSchema);
export default RoleModel;
