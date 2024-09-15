import express from "express";
import {
  submitQuiz,
  getQuiz,
  postQuizContent,
  deleteQuizQuestion,
  putQuizContent,
} from "../controllers/quizController";

const router = express.Router();

router.get("/", getQuiz);
router.post("/submit", submitQuiz);
router.post("/", postQuizContent);
router.delete("/:id", deleteQuizQuestion);
router.put("/:id", putQuizContent);

export default router;
