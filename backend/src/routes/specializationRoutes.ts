import express from "express";
import {
  addTestimonialsBySpecName,
  getSpecByName,
  getSpecs,
  getTestimonialsBySpecName,
  updateSpecByName,
} from "../controllers/specializationsController";
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

router.get("/", getSpecs);
router.get("/:name", getSpecByName);

// Route for updating specialization info with image upload
router.patch(
  "/:name",
  upload.fields([
    { name: "leftImage", maxCount: 1 },
    { name: "rightImage", maxCount: 1 },
  ]),
  updateSpecByName
);

// Routes for testimonials
router.get("/testimonials/:name", getTestimonialsBySpecName);
router.post("/testimonials/:name", addTestimonialsBySpecName);

export default router;
