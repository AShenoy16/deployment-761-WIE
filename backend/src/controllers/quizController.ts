import { Request, Response } from "express";
import { QuizSubmissionRequest } from "../types/quizTypes";
import {
  deleteQuestion,
  getSpecQuiz,
  isValidQuestionType,
  processQuizSubmission,
} from "../services/quizService";
import { isQuizSubmissionRequest } from "../validation/quizValidation";

export const getQuiz = async (req: Request, res: Response) => {
  const quiz = await getSpecQuiz();

  if (!quiz) {
    return res.status(404).send({ message: "Quiz Not Found" });
  }

  const sortedQuizData = quiz.sort((a, b) =>
    a._id.toString().localeCompare(b._id.toString())
  );

  return res.status(200).json(sortedQuizData);
};

/**
 * Controller endpoint method to delete quiz question by id
 * @param req
 * @param res
 * @returns
 */
export const deleteQuizQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { qType } = req.body;

    if (!id || !qType || !isValidQuestionType(qType)) {
      return res.status(422).json({ message: "Incorrect Information" });
    }

    const result = await deleteQuestion(id, qType);

    if (!result) {
      return res.status(404).json({ message: "Transaction Aborted Incorrect ID" });
    }

    return res.status(200).json({ message: "Question Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Network error" });
  }
};

/**
 * Controller that will process quiz submission and return top three results
 * assuming validation has been done on the frontend and the types are correct
 * @param req
 * @param res
 */
export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const quizSubmission: QuizSubmissionRequest = req.body;

    // missing info/incorrect info
    if (!isQuizSubmissionRequest(quizSubmission)) {
      return res.status(422).json({ message: "Incorrect Information" });
    }

    const result = await processQuizSubmission(quizSubmission);

    if (!result) {
      return res.status(500).json({ error: "Failed to process submission" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to process submission" });
  }
};
