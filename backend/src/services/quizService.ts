import { spec } from "node:test/reporters";
import { quizResults } from "../constants/quizConstants";
import { IMCQAnswerOption, IQuiz } from "../models/interfaces";
import Quiz from "../models/QuizModel";
import { QuizSubmissionRequest } from "../types/quizTypes";
import { isQuizSubmissionRequest } from "../validation/quizValidation";
import RankingQuestion from "../models/RankingModel";
import SliderQuestion from "../models/SliderModel";
import MCQQuestion from "../models/MCQModel";
import mongoose from "mongoose";
import { Console } from "console";

/**
 * Servixe code that will actually calculate the results
 * @param quizSubmission
 * @returns
 */
export const processQuizSubmission = async (
  quizSubmission: QuizSubmissionRequest
) => {
  try {
    // have a hashmap of the spec : score -> returning an array
    let specMap = quizResults.specResults;

    // get the quiz and store it in memory

    // error getting quiz

    // loop through all the question types -> depending on question type -> do diff funtion

    console.log(specMap);

    await mcqResults(quizSubmission.mcqAnswers, specMap);

    console.log(specMap);
    await sliderResults(quizSubmission.sliderAnswers, specMap);

    console.log(specMap);

    // loop through all question types -> ensuring it is not empty/undefined

    // update specific weightings in the hashmap of the spec:score

    // return top three specs

    return 1;
  } catch (error) {
    return null;
  }
};

/**
 * This will return the quiz in the database if present, otherwise null
 * @returns Quiz or null
 */
export const getSpecQuiz = async () => {
  const quizIds = await getQuizIds();
  const mcq = await fetchMCQ(quizIds);
  const slider = await fetchSlider(quizIds);
  const ranking = await fetchRanking(quizIds);

  // Combine all questions into a single array
  const allQuestions = [...mcq, ...slider, ...ranking];

  console.log(allQuestions);

  return allQuestions;
};

// Fetch MCQQuestions
const fetchMCQ = async (ids: any[]) => {
  const mcqQuestions = await MCQQuestion.aggregate([
    { $match: { _id: { $in: ids } } },
    {
      $project: {
        createdAt: 0, // exclude fields with 0
        updatedAt: 0,
        __v: 0,
      },
    },
  ]).exec();

  return mcqQuestions;
};

const fetchSlider = async (ids: any[]) => {
  const mcqQuestions = await SliderQuestion.aggregate([
    { $match: { _id: { $in: ids } } },
    {
      $project: {
        createdAt: 0, // exclude fields with 0
        updatedAt: 0,
        __v: 0,
      },
    },
  ]).exec();

  return mcqQuestions;
};

const fetchRanking = async (ids: any) => {
  const mcqQuestions = await RankingQuestion.aggregate([
    { $match: { _id: { $in: ids } } },
    {
      $project: {
        createdAt: 0, // exclude fields with 0
        updatedAt: 0,
        __v: 0,
      },
    },
  ]).exec();

  return mcqQuestions;
};

const getQuizIds = async () => {
  const ids = await Quiz.find().select("quizQuestions");
  return ids[0].quizQuestions;
};

const mcqResults = async (
  mcqAnswers: { [questionId: string]: string },
  specResults: { [specName: string]: number }
) => {
  // is an object and there are keys present
  if (!isQuizSubmissionRequest(mcqAnswers)) {
    return;
  }

  // convert optionId strings to ObjectiD
  const mcqQuestionIds = Object.keys(mcqAnswers);
  const objectIds = mcqQuestionIds.map((id) => new mongoose.Types.ObjectId(id));

  // get all the mcqQuestions
  const mcqQuestions = await fetchMCQ(objectIds);

  // loop through mcqQuestions -> get the corresponding answer options and update weighting

  mcqQuestions.forEach((question) => {
    const questionId: string = question._id.toString();
    const answerOptionId: string = mcqAnswers[questionId];

    // get weightings for desired question and answer
    const selectedAnswerOption = question.answerOptions.find(
      (option: IMCQAnswerOption) => option._id.toString() === answerOptionId
    );

    const weightings = selectedAnswerOption.weightings;

    // update the spec map
    for (let spec in weightings) {
      specResults[spec] += weightings[spec];
    }
  });
};

/**
 * method to update specMap of slider results
 * @param sliderAnswers object that has questionId to number of the slider 
 * -> this will be the index inside the database 
 * @param specResults specMap 
 */
const sliderResults = async (
  sliderAnswers: { [questionNumber: string]: number; },
  specResults: { [specName: string]: number }
) => {

   // is an object and there are keys present
   if (!isQuizSubmissionRequest(sliderAnswers)) {
    return;
  }

   // convert optionId strings to ObjectiD
   const sliderQuestionIds = Object.keys(sliderAnswers);
   const objectIds = sliderQuestionIds.map((id) => new mongoose.Types.ObjectId(id));
 
   // get all the slider questions
   const sliderQuestions = await fetchSlider(objectIds);
 
   // loop through all the slider questions -> updating the correct value 
 
   sliderQuestions.forEach((question) => {
    const sliderIndex = sliderAnswers[question._id.toString()]

    // index of weightings array to use to update data

    const weightings = question.sliderRange.weightings

    // update spec map 
    for(const spec in weightings){
      const specWeighting = weightings[spec]
      specResults[spec] += specWeighting[sliderIndex]
    }
 
   });





};
