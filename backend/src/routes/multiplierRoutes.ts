import express from "express";
import {
  getMultipliers,
  updateMultipliers,
} from "../controllers/multiplierController";

const router = express.Router();

router.get("/", getMultipliers);
router.put("/", updateMultipliers);

export default router;
