import express from "express";
import { getTestimonials } from "../controllers/testimonialController";

const router = express.Router();

router.get("/:name", getTestimonials);

export default router;
