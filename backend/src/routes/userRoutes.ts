import express from "express";
import { loginUsers } from "../controllers/userController";

const router = express.Router();

router.post("/", loginUsers);

export default router;
