import { QuizSubmissionRequest } from "../types/quizTypes";

/**
 * Servixe code that will actually calculate the results
 * @param quizSubmission 
 * @returns 
 */
export const processQuizSubmission = async (quizSubmission: QuizSubmissionRequest) => {

    console.log(quizSubmission)

    return 1;
}