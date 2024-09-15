import { Request, Response } from "express";
import { QuizSubmissionRequest } from "../types/quizTypes";
import { getSpecQuiz, processQuizSubmission } from "../services/quizService";
import { isQuizSubmissionRequest } from "../validation/quizValidation";
import {
  IMCQAnswerOption,
  IMCQQuestion,
  IQuestion,
  IRankingQuestion,
  ISliderQuestion,
} from "../models/interfaces";
import MCQQuestion from "../models/MCQModel";
import SliderQuestion from "../models/SliderModel";
import RankingQuestion from "../models/RankingModel";
import Quiz from "../models/QuizModel";
import { defaultQuizQuestions } from "../constants/quizConstants";

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

export const postQuizContent = async (req: Request, res: Response) => {
  const { questionType } = req.body;

  // check if req.body is an empty object
  if (!questionType) {
    return res
      .status(400)
      .json({ message: "Quiz question data are required." });
  }

  try {
    let question;
    switch (questionType) {
      case "MCQ":
        question = new MCQQuestion(defaultQuizQuestions.mcq);
        break;
      case "Slider":
        question = new SliderQuestion(defaultQuizQuestions.slider);
        break;
      case "Ranking":
        question = new RankingQuestion(defaultQuizQuestions.ranking);
        break;
      default:
        return res.status(400).json({ message: "Invalid question type." });
    }

    const savedQuestion = await question.save();

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      "66e52088067cb204ed8509cb", // Currently hardcoded as there is only one document in quiz collection
      { $push: { quizQuestions: savedQuestion._id } },
      { new: true, useFindAndModify: false }
    ).populate("quizQuestions");

    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    return res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error adding quiz question:", error);
    return res.status(500).json({ message: "Server error", error });
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
