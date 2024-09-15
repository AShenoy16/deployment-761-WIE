import express from 'express';
import { submitQuiz, getQuiz, deleteQuizQuestion } from '../controllers/quizController';

const router = express.Router();

router.get('/', getQuiz);
router.post('/', submitQuiz)
router.delete('/:id', deleteQuizQuestion)

export default router;
