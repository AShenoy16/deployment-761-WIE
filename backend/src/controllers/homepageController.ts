import { Request, Response } from "express";
import HomePage from "../models/HomepageModel";

// Get the home page data
export const getHomePage = async (req: Request, res: Response) => {
  try {
    const homePage = await HomePage.findOne();
    if (!homePage) {
      return res.status(404).json({ message: "Home page content not found" });
    }
    return res.status(200).json(homePage);
  } catch (error) {
    console.error("Error fetching home page:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update the home page data
export const updateHomePage = async (req: Request, res: Response) => {
  try {
    const homePage = await HomePage.findOne();
    if (!homePage) {
      return res.status(404).json({ message: "Home page content not found" });
    }

    const {
      heroTitle,
      heroSubtitle,
      heroImage,
      section1Header,
      section1Text,
      section2Header,
      section2Text,
      additionalResources,
    } = req.body;

    homePage.heroTitle = heroTitle || homePage.heroTitle;
    homePage.heroSubtitle = heroSubtitle || homePage.heroSubtitle;
    homePage.heroImage = heroImage || homePage.heroImage;
    homePage.section1Header = section1Header || homePage.section1Header;
    homePage.section1Text = section1Text || homePage.section1Text;
    homePage.section2Header = section2Header || homePage.section2Header;
    homePage.section2Text = section2Text || homePage.section2Text;
    homePage.additionalResources =
      additionalResources || homePage.additionalResources;

    await homePage.save();
    return res.status(200).json(homePage);
  } catch (error) {
    console.error("Error updating home page:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
