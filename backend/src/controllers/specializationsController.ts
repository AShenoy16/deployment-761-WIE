import { Request, Response } from "express";
import Specialization from "../models/SpecializationModel";
import { MulterFile } from "../types/MulterFile";
import {
  getSpecializationByName,
  isTestimonial,
} from "../services/specializationService";
import { ITestimonial } from "../models/interfaces";
import fs from "fs";
import path from "path";

/**
 * Fetches all specializations from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing all specializations or a 404 error if none are found.
 */
export const getSpecs = async (req: Request, res: Response) => {
  try {
    // Fetch all specializations from the database
    const specializations = await Specialization.find();
    // Check if no specializations are found
    if (!specializations || specializations.length === 0) {
      return res.status(404).json({ message: "No specializations found" });
    }
    // Return the list of specializations
    return res.status(200).json(specializations);
  } catch (error) {
    // Handle any server errors
    console.error("Error fetching specializations:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Fetches a specific specialization by its name.
 * @param {Request} req - Express request object containing the specialization name in req.params.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the specialization or a 404 error if not found.
 */
export const getSpecByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    // Fetch the specialization by its name using the service function
    const specialization = await getSpecializationByName(name);

    // If the specialization is not found, return a 404 error
    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    // Return the specialization details
    return res.status(200).json(specialization);
  } catch (error) {
    // Handle any server errors
    console.error("Error fetching specialization by name:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Updates the details of a specific specialization by its name.
 * @param {Request} req - Express request object containing specialization name in req.params and updated fields in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated specialization or a 404 error if the specialization is not found.
 */
export const updateSpecByName = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    // Find the specialization by name, case-insensitive
    const specialization = await Specialization.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    // If the specialization is not found, return a 404 error
    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    // Extract the fields from the request body to update the specialization
    const {
      name: newName,
      header,
      careerPathways,
      leftDetail,
      rightDetail,
      testimonials,
      jobAvailability,
      medianSalary,
      experiencedSalary,
      source,
    } = req.body;

    // Update fields if provided, otherwise keep the existing ones
    specialization.name = newName || specialization.name;
    specialization.header = header || specialization.header;
    specialization.careerPathways = careerPathways
      ? JSON.parse(careerPathways)
      : specialization.careerPathways;
    specialization.leftDetail = leftDetail || specialization.leftDetail;
    specialization.rightDetail = rightDetail || specialization.rightDetail;
    specialization.testimonials = testimonials
      ? JSON.parse(testimonials)
      : specialization.testimonials;
    specialization.jobAvailability =
      jobAvailability || specialization.jobAvailability;
    specialization.medianSalary = medianSalary || specialization.medianSalary;
    specialization.experiencedSalary =
      experiencedSalary || specialization.experiencedSalary;
    specialization.source = source || specialization.source;

    // Handle image uploads for left and right images
    const files = req.files as { [fieldname: string]: MulterFile[] };

    // Update and delete the old left image if a new one is uploaded
    if (files?.leftImage) {
      if (specialization.leftImage) {
        const oldLeftImagePath = path.join(
          __dirname,
          "../../public",
          specialization.leftImage
        );
        fs.unlink(oldLeftImagePath, (err) => {
          if (err) {
            console.error("Error deleting old left image:", err);
          } else {
            console.log("Old left image deleted successfully");
          }
        });
      }

      const leftImage = files["leftImage"][0];
      specialization.leftImage = `/uploads/${leftImage.filename}`;
    }

    // Update and delete the old right image if a new one is uploaded
    if (files?.rightImage) {
      if (specialization.rightImage) {
        const oldRightImagePath = path.join(
          __dirname,
          "../../public",
          specialization.rightImage
        );
        fs.unlink(oldRightImagePath, (err) => {
          if (err) {
            console.error("Error deleting old right image:", err);
          } else {
            console.log("Old right image deleted successfully");
          }
        });
      }

      const rightImage = files["rightImage"][0];
      specialization.rightImage = `/uploads/${rightImage.filename}`;
    }

    // Save the updated specialization to the database
    await specialization.save();

    // Return the updated specialization details
    return res.status(200).json(specialization);
  } catch (error) {
    // Handle any server errors
    console.error("Error updating specialization:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Fetches all testimonials for a specific specialization.
 * @param {Request} req - Express request object containing the specialization name in req.params.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the testimonials or a 404 error if the specialization is not found.
 */
export const getTestimonialsBySpecName = async (
  req: Request,
  res: Response
) => {
  const { name } = req.params;
  try {
    // Fetch the specialization by name
    const specialization = await getSpecializationByName(name);

    // If the specialization is not found, return a 404 error
    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    // Return the list of testimonials for the specialization
    const testimonials = specialization.testimonials;
    return res.status(200).json(testimonials);
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Adds a new testimonial to a specialization.
 * @param {Request} req - Express request object containing specialization name in req.params and testimonial data in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated list of testimonials or an error response if data is invalid or specialization is not found.
 */
export const addTestimonialsBySpecName = async (
  req: Request,
  res: Response
) => {
  const { name: currentName } = req.params;
  const testimonial: ITestimonial = req.body;

  try {
    // Validate that the testimonial data is correct
    if (!isTestimonial(testimonial)) {
      return res.status(400).json({ message: "Invalid testimonial data" });
    }

    // Fetch the specialization by name
    const specialization = await getSpecializationByName(currentName);

    // If the specialization is not found, return a 404 error
    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    // Add the new testimonial to the specialization's testimonials array
    specialization.testimonials.push(testimonial);
    specialization.save();
    const testimonials = specialization.testimonials;

    // Return the updated list of testimonials
    return res.status(200).json(testimonials);
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({ message: "Server error", error });
  }
};

/**
 * Deletes a testimonial from a specialization by its ID.
 * @param {Request} req - Express request object containing specialization name and testimonial ID in req.params.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated list of testimonials or an error response if the specialization or testimonial is not found.
 */
export const deleteTestimonial = async (req: Request, res: Response) => {
  const { name: currentName, id: testimonialId } = req.params;

  try {
    // Fetch the specialization by name
    const specialization = await getSpecializationByName(currentName);

    // If the specialization is not found, return a 404 error
    if (!specialization) {
      return res.status(404).json({ message: "Specialization not found" });
    }

    // Remove the testimonial with the matching _id from the testimonials array
    specialization.testimonials = specialization.testimonials.filter(
      (testimonial: ITestimonial) =>
        testimonial._id.toString() !== testimonialId
    );
    specialization.save();
    const testimonials = specialization.testimonials;

    // Return the updated list of testimonials
    return res.status(200).json(testimonials);
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({ message: "Server error", error });
  }
};
