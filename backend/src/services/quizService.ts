import { quizResults } from "../constants/quizConstants";
import Quiz from "../models/QuizModel";
import { QuizSubmissionRequest } from "../types/quizTypes";

/**
 * Servixe code that will actually calculate the results
 * @param quizSubmission 
 * @returns 
 */
export const processQuizSubmission = async (quizSubmission: QuizSubmissionRequest) => {


    // have a hashmap of the spec : score -> returning an array 
    console.log(quizResults.specResults)
    
    // get the quiz and store it in memory 

    // loop through all question types -> ensuring it is not empty/undefined
    

    // update specific weightings in the hashmap of the spec:score

    // return top three specs



    return 1;
}

/**
 * This will return the quiz in the database if present, otherwise null
 * @returns Quiz or null 
 */
export const getSpecQuiz = async () =>  {
    const quiz = await Quiz.find({
        quizName: "Engineering Specialization Quiz"
    })

    return quiz;
}