import { Request, Response } from "express";
import Specialization from "../models/SpecializationModel";
import { MulterFile } from "../types/MulterFile";
import { getSpecializationByName } from "../services/specializationService";

// Get all specializations
export const getSpecs = async (req: Request, res: Response) => {
  try {
    const specializations = await Specialization.find(); // Fetch all specializations
    if (!specializations || specializations.length === 0) {
      return res.status(404).json({ message: "No specializations found" });
    }
    return res.status(200).json(specializations);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get a specific specialization by name
export const getSpecByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const specialization = await getSpecializationByName(name);

    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    return res.status(200).json(specialization);
  } catch (error) {
    console.error("Error fetching specialization by name:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update a specific specialization
export const updateSpecByName = async (req: Request, res: Response) => {
  const { name: currentName } = req.params; // Renamed to 'currentName' to avoid conflict

  try {
    const specialization = await Specialization.findOne({
      name: { $regex: new RegExp(`^${currentName}$`, "i") },
    });

    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    // Extract text fields from the request
    const { name, header, careerPathways, leftDetail, rightDetail } = req.body;

    // Update fields in the specialization object
    specialization.name = name || specialization.name;
    specialization.header = header || specialization.header;
    specialization.careerPathways = careerPathways
      ? JSON.parse(careerPathways)
      : specialization.careerPathways;
    specialization.leftDetail = leftDetail || specialization.leftDetail;
    specialization.rightDetail = rightDetail || specialization.rightDetail;

    // Handle image uploads
    const files = req.files as { [fieldname: string]: MulterFile[] };

    if (files?.leftImage) {
      const leftImage = files["leftImage"][0];
      specialization.leftImage = `/uploads/${leftImage.filename}`;
    }

    if (files?.rightImage) {
      const rightImage = files["rightImage"][0];
      specialization.rightImage = `/uploads/${rightImage.filename}`;
    }

    // Save the updated specialization
    await specialization.save();

    return res.status(200).json(specialization);
  } catch (error) {
    console.error("Error updating specialization:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Controller to get testimonials by spec name
 */
export const getTestimonialsBySpecName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const specialization = await getSpecializationByName(name);

    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }
    const testimonials = specialization.testimonials;
    return res.status(200).json(testimonials);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
