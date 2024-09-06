import express from 'express';
import { submitQuiz, getQuiz } from '../controllers/quizController';

const router = express.Router();

router.get('/', getQuiz);
router.post('/', submitQuiz)

export default router;
