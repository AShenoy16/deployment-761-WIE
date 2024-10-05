import express from "express";
import { getHomePage, updateHomePage } from "../controllers/homepageController";
import multer from "multer";

const router = express.Router();
// Configure multer for file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads/"); // Save images in the 'public/uploads' folder
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`); // Name the file with a timestamp
	},
});

const upload = multer({ storage });

router.get("/", getHomePage);
// router.patch("/", updateHomePage);

// Route for updating specialization info with image upload
router.patch("/", upload.fields([{ name: "heroImage", maxCount: 1 }]), updateHomePage);

export default router;
