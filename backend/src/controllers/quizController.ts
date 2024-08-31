import { Request, Response } from "express";
import { QuizSubmissionRequest } from "../types/quizTypes";
import { getSpecQuiz, processQuizSubmission } from "../services/quizService";
import { isQuizSubmissionRequest } from "../validation/quizValidation";

export const getQuiz = async (req: Request, res: Response) => {

  const quiz = await getSpecQuiz()

  if(!quiz){
    return res.status(200).json(quiz)
  }

  return res.status(404).send({message: "Quiz Not Found"})
  
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
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process submission' });
  }
};
