import express from "express";
import {
  submitQuiz,
  getQuiz,
  postQuizContent,
} from "../controllers/quizController";

const router = express.Router();

router.get("/", getQuiz);
router.post("/submit", submitQuiz);
router.post("/", postQuizContent);

export default router;
