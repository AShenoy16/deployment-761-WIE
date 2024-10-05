import { Request, Response } from "express";
import HomePage from "../models/HomepageModel";
import { MulterFile } from "../types/MulterFile";

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

export const updateHomePage = async (req: Request, res: Response) => {
	try {
		const homePage = await HomePage.findOne();
		if (!homePage) {
			return res.status(404).json({ message: "Home page content not found" });
		}

		const { heroTitle, heroSubtitle, section1Header, section1Text, section2Header, section2Text, additionalResources } = req.body;

		homePage.heroTitle = heroTitle || homePage.heroTitle;
		homePage.heroSubtitle = heroSubtitle || homePage.heroSubtitle;
		homePage.section1Header = section1Header || homePage.section1Header;
		homePage.section1Text = section1Text || homePage.section1Text;
		homePage.section2Header = section2Header || homePage.section2Header;
		homePage.section2Text = section2Text || homePage.section2Text;

		// Parse additionalResources if it's a JSON string
		homePage.additionalResources = additionalResources ? JSON.parse(additionalResources) : homePage.additionalResources;

		// Handle image uploads
		const files = req.files as { [fieldname: string]: MulterFile[] };

		if (files?.heroImage) {
			const heroImage = files["heroImage"][0];
			homePage.heroImage = `/uploads/${heroImage.filename}`;
		}
		console.log(homePage.heroImage);
		await homePage.save();
		return res.status(200).json(homePage);
	} catch (error) {
		console.error("Error updating home page:", error);
		return res.status(500).json({ message: "Server error" });
	}
};

// // Update the home page data
// export const updateHomePage = async (req: Request, res: Response) => {
// 	try {
// 		const homePage = await HomePage.findOne();
// 		if (!homePage) {
// 			return res.status(404).json({ message: "Home page content not found" });
// 		}

// 		const { heroTitle, heroSubtitle, heroImage, section1Header, section1Text, section2Header, section2Text, additionalResources } = req.body;

// 		homePage.heroTitle = heroTitle || homePage.heroTitle;
// 		homePage.heroSubtitle = heroSubtitle || homePage.heroSubtitle;
// 		// homePage.heroImage = heroImage || homePage.heroImage;
// 		homePage.section1Header = section1Header || homePage.section1Header;
// 		homePage.section1Text = section1Text || homePage.section1Text;
// 		homePage.section2Header = section2Header || homePage.section2Header;
// 		homePage.section2Text = section2Text || homePage.section2Text;
// 		homePage.additionalResources = additionalResources || homePage.additionalResources;

// 		console.log(req.files);
// 		// Handle image uploads
// 		const files = req.files as { [fieldname: string]: MulterFile[] };

// 		if (files?.heroImage) {
// 			const heroImage = files["heroImage"][0];
// 			homePage.heroImage = `/uploads/${heroImage.filename}`;
// 		}

// 		await homePage.save();
// 		return res.status(200).json(homePage);
// 	} catch (error) {
// 		console.error("Error updating home page:", error);
// 		return res.status(500).json({ message: "Server error" });
// 	}
// };
