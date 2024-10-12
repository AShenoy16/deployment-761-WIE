import { Request, Response } from "express";
import HomePage from "../models/HomepageModel";
import { MulterFile } from "../types/MulterFile";
import fs from "fs";
import path from "path";

/**
 * Retrieves the home page content from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the home page data or a 404 error if no content is found.
 */
export const getHomePage = async (req: Request, res: Response) => {
  try {
    // Fetch the homepage content from the database
    const homePage = await HomePage.findOne();
    // If no homepage content is found, return a 404 error
    if (!homePage) {
      return res.status(404).json({ message: "Home page content not found" });
    }
    // Return the homepage content
    return res.status(200).json(homePage);
  } catch (error) {
    // Handle any server error
    console.error("Error fetching home page:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * Updates the home page content with the provided data.
 * Handles updates to text fields and optional image uploads.
 * @param {Request} req - Express request object containing the updated home page fields in req.body and optional files in req.files.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated home page data or an error message if the operation fails.
 */
export const updateHomePage = async (req: Request, res: Response) => {
  try {
    // Fetch the current homepage content from the database
    const homePage = await HomePage.findOne();
    // If no homepage content is found, return a 404 error
    if (!homePage) {
      return res.status(404).json({ message: "Home page content not found" });
    }

    // Destructure the fields from the request body
    const {
      heroTitle,
      heroSubtitle,
      section1Header,
      section1Text,
      section2Header,
      section2Text,
      additionalResources,
    } = req.body;

    // Update the homepage fields with new values if provided, otherwise keep the existing values
    homePage.heroTitle = heroTitle || homePage.heroTitle;
    homePage.heroSubtitle = heroSubtitle || homePage.heroSubtitle;
    homePage.section1Header = section1Header || homePage.section1Header;
    homePage.section1Text = section1Text || homePage.section1Text;
    homePage.section2Header = section2Header || homePage.section2Header;
    homePage.section2Text = section2Text || homePage.section2Text;

    // If additionalResources is a string, parse it as JSON, otherwise keep the existing resources
    homePage.additionalResources = additionalResources
      ? JSON.parse(additionalResources)
      : homePage.additionalResources;

    // Handle image uploads if new images are provided
    const files = req.files as { [fieldname: string]: MulterFile[] };

    // Check if a new hero image was uploaded
    if (files?.heroImage) {
      const heroImage = files["heroImage"][0];

      // Remove the old hero image if it exists
      if (homePage.heroImage) {
        const oldImagePath = path.join(
          __dirname,
          "../../public",
          homePage.heroImage
        );
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully");
          }
        });
      }

      // Update the homepage with the new hero image path
      homePage.heroImage = `/uploads/${heroImage.filename}`;
    }

    // Save the updated homepage content
    await homePage.save();
    // Return the updated homepage data
    return res.status(200).json(homePage);
  } catch (error) {
    // Handle any server error
    console.error("Error updating home page:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
