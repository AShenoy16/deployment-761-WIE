import { Request, Response } from "express";
import Specialization from "../models/SpecializationModel";

// Get all specializations
export const getSpecs = async (req: Request, res: Response) => {
  try {
    const specializations = await Specialization.find(); // Fetch all specializations
    if (!specializations || specializations.length === 0) {
      return res.status(404).json({ message: 'No specializations found' });
    }
    return res.status(200).json(specializations);
  } catch (error) {
    console.error('Error fetching specializations:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific specialization by name 
export const getSpecByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    // Case-insensitive search using regex with the 'i' flag
    const specialization = await Specialization.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    return res.status(200).json(specialization);
  } catch (error) {
    console.error("Error fetching specialization by name:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update a specific specialization by name
export const updateSpecByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  const updates = req.body; 

  try {
    const updatedSpecialization = await Specialization.findOneAndUpdate(
      { name: { $regex: new RegExp(`^${name}$`, "i") } }, 
      { $set: updates },
      { new: true, runValidators: true } 
    );

    if (!updatedSpecialization) {
      return res.status(404).json({ message: 'Specialization not found' });
    }

    return res.status(200).json(updatedSpecialization);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update specialization' });
  }
};