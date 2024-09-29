import express from "express";
import { getHomePage, updateHomePage } from "../controllers/homepageController";

const router = express.Router();

router.get("/", getHomePage);
router.patch("/", updateHomePage);

export default router;
