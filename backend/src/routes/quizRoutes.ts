import express from "express";
import {
  submitQuiz,
  getQuiz,
  postQuizContent,
  deleteQuizQuestion,
} from "../controllers/quizController";

const router = express.Router();

router.get("/", getQuiz);
router.post("/submit", submitQuiz);
router.post("/", postQuizContent);
router.delete("/:id", deleteQuizQuestion);

export default router;
