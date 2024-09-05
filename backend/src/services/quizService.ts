import { spec } from "node:test/reporters";
import { quizResults } from "../constants/quizConstants";
import {
  IMCQAnswerOption,
  IQuiz,
  IRankingAnswerOption,
  IRankingQuestion,
} from "../models/interfaces";
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

    await mcqResults(quizSubmission.mcqAnswers, specMap);
    await sliderResults(quizSubmission.sliderAnswers, specMap);
    await rankingResults(quizSubmission.rankingAnswers, specMap);

    const entries = Object.entries(specMap);

    // Sort entries by value
    entries.sort(([, valueA], [, valueB]) => valueB - valueA);

    const top3Entries = entries.slice(0, 3);

    // Convert sorted array back to object
    const sortedObj = Object.fromEntries(top3Entries);

    // return top three specs
    return sortedObj;
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

// fetch SliderQuestions
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

// fetch rankingQuestions
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

// get all QuizQuestion Ids from Database
const getQuizIds = async () => {
  const ids = await Quiz.find().select("quizQuestions");
  return ids[0].quizQuestions;
};

/**
 * Calculate mcq quiz question results
 * @param mcqAnswers -> json object of mcq question: chosen answer (both ids)
 * @param specResults -> specMap
 * @returns
 */
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
  sliderAnswers: { [questionNumber: string]: number },
  specResults: { [specName: string]: number }
) => {
  // is an object and there are keys present
  if (!isQuizSubmissionRequest(sliderAnswers)) {
    return;
  }

  // convert optionId strings to ObjectiD
  const sliderQuestionIds = Object.keys(sliderAnswers);
  const objectIds = sliderQuestionIds.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  // get all the slider questions
  const sliderQuestions = await fetchSlider(objectIds);

  // loop through all the slider questions -> updating the correct value

  sliderQuestions.forEach((question) => {
    const sliderIndex = sliderAnswers[question._id.toString()] - 1;

    // index of weightings array to use to update data

    const weightings = question.sliderRange.weightings;
    // update spec map
    for (const spec in weightings) {
      const specWeighting = weightings[spec];
      specResults[spec] += specWeighting[sliderIndex];
    }
  });
};

/**
 * Method to update specMap of ranking results
 * @param rankingAnswers object that has questionId, and nested object with the optionId to the rank
 * -> will not be index inside database, but rather an object
 * @param specResults specMap
 */
const rankingResults = async (
  rankingAnswers: {
    [questionNumber: string]: { rankings: { [optionId: string]: number } };
  },
  specResults: { [specName: string]: number }
) => {
  // is an object and there are keys present
  if (!isQuizSubmissionRequest(rankingAnswers)) {
    return;
  }

  // convert optionId strings to ObjectiD
  const rankingQuestionIds = Object.keys(rankingAnswers);
  const objectIds = rankingQuestionIds.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  // // get all the rankingQuestions
  const rankingQuestions = await fetchRanking(objectIds);

  // creates a map of question -> {answerId: weights}
  const questionsMap = new Map();

  rankingQuestions.forEach((obj) => {
    // Initialize a nested map if the questionId does not exist in the outer map
    if (!questionsMap.has(obj._id.toString())) {
      questionsMap.set(obj._id.toString(), new Map());
    }

    // Get the inner map of answer options for this question
    const answerMap = questionsMap.get(obj._id.toString());

    // Add each answer option's answerId and weightings to the inner map
    obj.answerOptions.forEach(
      (option: { _id: { toString: () => any }; weightings: any }) => {
        answerMap.set(option._id.toString(), {
          weightings: option.weightings,
        });
      }
    );

    // Update the outer map with the inner map of answer options
    questionsMap.set(obj._id.toString(), answerMap);
  });

  for (const questionNumber in rankingAnswers) {
    const question = rankingAnswers[questionNumber];
    const { rankings } = question; // Extract rankings object

    // get answerMap -> answerId : weights
    const answerMap = questionsMap.get(questionNumber);

    for (const [answerId, rank] of Object.entries(rankings)) {
      // get the necessary weights
      const answerData = answerMap.get(answerId);
      const { weightings } = answerData;

      // update specMap
      weightings.forEach(
        (specialization: { weights: any; specializationName: string }) => {
          const { weights, specializationName } = specialization;
          const amount = weights[rank];
          specResults[specializationName] += amount;
        }
      );
    }
  }
  return;
};
