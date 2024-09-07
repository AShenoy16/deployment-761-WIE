import express from "express";
import {
  addRoleModels,
  getRoleModels,
} from "../controllers/roleModelController";

const router = express.Router();

router.get("/", getRoleModels);

router.post("/", addRoleModels);

export default router;
