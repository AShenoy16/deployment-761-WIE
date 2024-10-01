import express from "express";
import {
  addRoleModels,
  deleteRoleModel,
  getRoleModels,
  getSpecRoleModels,
  putRoleModels,
} from "../controllers/roleModelController";

const router = express.Router();

router.get("/", getRoleModels);

router.post("/", addRoleModels);

router.delete("/:id", deleteRoleModel);

router.put("/:id", putRoleModels);

router.get("/:specName", getSpecRoleModels)

export default router;
