import express from "express";
import { getHSRequirements } from "../controllers/highSchoolRequirementController";
const router = express.Router();

router.get("/", getHSRequirements);
// router.put("/", updateHSRequirements);

export default router;
