import express from "express";
import {
  addRoleModels,
  deleteRoleModel,
  getRoleModels,
} from "../controllers/roleModelController";

const router = express.Router();

router.get("/", getRoleModels);

router.post("/", addRoleModels);

router.delete("/:id", deleteRoleModel);

export default router;
