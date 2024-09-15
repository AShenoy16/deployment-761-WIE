import { Request, Response } from "express";
import { QuizSubmissionRequest } from "../types/quizTypes";
import {
  addDefaultQuizQuestion,
  deleteQuestion,
  getSpecQuiz,
  isValidQuestionType,
  processQuizSubmission,
  updateQuestionById,
  validateUpdatedQuestionData,
} from "../services/quizService";
import { isQuizSubmissionRequest } from "../validation/quizValidation";
import mongoose from "mongoose";

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
 * Controller to add new quiz content question with default values
 * @param req
 * @param res
 * @returns
 */
export const postQuizContent = async (req: Request, res: Response) => {
  const { questionType } = req.body;

  // check if req.body is an empty object
  if (!questionType || !isValidQuestionType(questionType)) {
    return res
      .status(400)
      .json({ message: "Quiz question data are required." });
  }

  try {
    const updatedQuiz = await addDefaultQuizQuestion(questionType);

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    return res.status(200).json(updatedQuiz);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle Mongoose validation errors specifically
      console.error("Validation Error:", error.errors);
      throw new Error("Validation error: " + error.message);
    } else {
      console.error("Error adding quiz question:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }
};

/**
 * Controller to update quiz content question by question Id
 * @param req
 * @param res
 * @returns
 */
export const putQuizContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    validateUpdatedQuestionData(updatedData);
  } catch (error) {
    return res.status(400).json({
      message: "Please select a proper specialization for each weighting",
    });
  }

  try {
    const updatedQuestion = await updateQuestionById(id, updatedData);

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }

    return res.status(200).json({
      message: "Question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      // Handle Mongoose validation errors specifically
      console.error("Validation Error:", error.errors);
      throw new Error("Validation error: " + error.message);
    } else {
      console.error("Error updating quiz question:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }
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
    const { questionType } = req.body;

    if (!id || !questionType || !isValidQuestionType(questionType)) {
      return res.status(422).json({ message: "Incorrect Information" });
    }

    const result = await deleteQuestion(id, questionType);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Transaction Aborted Incorrect ID" });
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
