import express from "express";
import { getHomePage, updateHomePage } from "../controllers/homepageController";

const router = express.Router();

router.get("/homepage", getHomePage);
router.patch("/", updateHomePage);

export default router;
