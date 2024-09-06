import { QuizSubmissionRequest } from '../types/quizTypes';

/**
 * Validation to ensure quiz type is correct
 * 
 * @param obj any object -> but if returns true then the obj is of type QuizSubmissionRequest
 * @returns 
 */
export function isQuizSubmissionRequest(obj: any): obj is QuizSubmissionRequest {
  return (
    typeof obj === 'object' &&  // Check if obj is an object or null
    Object.keys(obj).length !== 0 // check len not equal to zero
  );
}
