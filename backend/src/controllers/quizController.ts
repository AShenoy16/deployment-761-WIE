import { Request, Response } from "express";
import { QuizSubmissionRequest } from "../types/quizTypes";
import {
  addDefaultQuizQuestion,
  deleteQuestion,
  getSpecQuiz,
  isValidQuestionType,
  isValidUpdatedQuestionData,
  processQuizSubmission,
  updateQuestionById,
} from "../services/quizService";
import { isQuizSubmissionRequest } from "../validation/quizValidation";
import mongoose from "mongoose";

/**
 * Retrieves the specialization quiz.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the sorted quiz data or a 404 error if not found.
 */
export const getQuiz = async (req: Request, res: Response) => {
  const quiz = await getSpecQuiz();

  // If no quiz data is found, return a 404 error
  if (!quiz) {
    return res.status(404).send({ message: "Quiz Not Found" });
  }

  // Sort the quiz data by their _id values
  const sortedQuizData = quiz.sort((a, b) =>
    a._id.toString().localeCompare(b._id.toString())
  );

  // Return the sorted quiz data
  return res.status(200).json(sortedQuizData);
};

/**
 * Adds a new quiz content question with default values.
 * @param {Request} req - Express request object containing the question type in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated quiz data or a 404 error if the quiz is not found.
 */
export const postQuizContent = async (req: Request, res: Response) => {
  const { questionType } = req.body;

  // Validate if the request body contains a valid question type
  if (!questionType || !isValidQuestionType(questionType)) {
    return res
      .status(400)
      .json({ message: "Quiz question data are required." });
  }

  try {
    // Add a new quiz question with default values
    const updatedQuiz = await addDefaultQuizQuestion(questionType);

    // If the quiz is not found, return a 404 error
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Return the updated quiz data
    return res.status(200).json(updatedQuiz);
  } catch (error) {
    // Handle Mongoose validation errors specifically
    if (error instanceof mongoose.Error.ValidationError) {
      console.error("Validation Error:", error.errors);
      throw new Error("Validation error: " + error.message);
    } else {
      // Handle other errors
      console.error("Error adding quiz question:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }
};

/**
 * Updates a quiz content question by question ID.
 * @param {Request} req - Express request object containing the question ID in req.params and the updated data in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the updated question or a 404 error if the question is not found.
 */
export const putQuizContent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;

  // Validate the updated question data
  if (!isValidUpdatedQuestionData(updatedData)) {
    return res.status(400).json({
      message: "Please select a proper specialization for each weighting",
    });
  }

  try {
    // Update the question by its ID with the new data
    const updatedQuestion = await updateQuestionById(id, updatedData);

    // If the question is not found, return a 404 error
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }

    // Return the successfully updated question
    return res.status(200).json({
      message: "Question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    // Handle Mongoose validation errors specifically
    if (error instanceof mongoose.Error.ValidationError) {
      console.error("Validation Error:", error.errors);
      throw new Error("Validation error: " + error.message);
    } else {
      // Handle other errors
      console.error("Error updating quiz question:", error);
      return res.status(500).json({ message: "Server error", error });
    }
  }
};

/**
 * Deletes a quiz question by its ID.
 * @param {Request} req - Express request object containing the question ID in req.params and question type in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing a success message or an error response if the deletion fails.
 */
export const deleteQuizQuestion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { questionType } = req.body;

    // Validate the ID and question type
    if (!id || !questionType || !isValidQuestionType(questionType)) {
      return res.status(422).json({ message: "Incorrect Information" });
    }

    // Attempt to delete the quiz question by ID
    const result = await deleteQuestion(id, questionType);

    // If the deletion fails due to incorrect ID, return a 404 error
    if (!result) {
      return res
        .status(404)
        .json({ message: "Transaction Aborted Incorrect ID" });
    }

    // Return a success message on successful deletion
    return res.status(200).json({ message: "Question Deleted" });
  } catch (error) {
    // Handle server error
    return res.status(500).json({ message: "Network error" });
  }
};

/**
 * Processes a quiz submission and returns the top three results.
 * Assumes validation has been done on the frontend.
 * @param {Request} req - Express request object containing the quiz submission data in req.body.
 * @param {Response} res - Express response object.
 * @returns {Response} JSON containing the quiz submission results or an error message if processing fails.
 */
export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const quizSubmission: QuizSubmissionRequest = req.body;

    // Validate the quiz submission data
    if (!isQuizSubmissionRequest(quizSubmission)) {
      return res.status(422).json({ message: "Incorrect Information" });
    }

    // Process the quiz submission and get the results
    const result = await processQuizSubmission(quizSubmission);

    // If processing fails, return a server error
    if (!result) {
      return res.status(500).json({ error: "Failed to process submission" });
    }

    // Return the quiz submission results
    res.status(200).json(result);
  } catch (error) {
    // Handle server error
    res.status(500).json({ error: "Failed to process submission" });
  }
};
