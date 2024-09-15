import { spec } from "node:test/reporters";
import { getInitialSpecResults } from "../constants/quizConstants";
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
import MultiplierData from "../models/multiplerModel";
import { getAllMultipliers } from "./multiplierService";

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
    const intialSpecRes = getInitialSpecResults();
    const specMap = intialSpecRes.specResults;

    // Run all result calculations in parallel
    await Promise.all([
      mcqResults(quizSubmission.mcqAnswers, specMap),
      sliderResults(quizSubmission.sliderAnswers, specMap),
      rankingResults(quizSubmission.rankingAnswers, specMap),
    ]);

    // round spec calculations to 2dp
    const roundedSpecMap = Object.fromEntries(
      Object.entries(specMap).map(([key, value]) => [
        key,
        parseFloat(value.toFixed(2)),
      ])
    );

    const entries = Object.entries(roundedSpecMap);

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
  const allQuestions = [...slider, ...ranking, ...mcq];
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
 * Returns slider update amount based on slider factor, weighting and choice
 * @param sliderChoice 1 - 5 representing users slider choice
 * @param weighting weighting of the spec
 * @param sliderFactor slider factor
 * @returns
 */
const getSliderWeightingValue = (
  sliderChoice: number,
  weighting: number,
  sliderFactor: number
) => {
  switch (sliderChoice) {
    case 1:
      return -1 * weighting;
    case 2:
      return -1 * (weighting / sliderFactor);
    case 3:
      return 0;
    case 4:
      return weighting / sliderFactor;
    case 5:
      return weighting;
    default:
      return 0;
  }
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
  const allFactors = await getAllMultipliers();
  const sliderFactor = allFactors[0].sliderFactor;

  // loop through all the slider questions -> updating the correct value

  sliderQuestions.forEach((question) => {
    const sliderIndex = sliderAnswers[question._id.toString()];

    // index of weightings array to use to update data

    const weightings = question.sliderWeights.weightings;
    for (const spec in weightings) {
      // get the weightings
      const specWeighting = weightings[spec];
      // get the update from the switch statement
      const specUpdate = getSliderWeightingValue(
        sliderIndex,
        specWeighting,
        sliderFactor
      );

      // update specMap
      specResults[spec] += specUpdate;
    }
  });
};

/**
 * Method to get update value for a spec based on the rank of the answer chosen
 * @param rank of the answer option
 * @param weighting of the spec
 * @param rank2Factor 
 * @param rank3Factor 
 * @returns 
 */
const getRankingUpdateValue = (
  rank: number,
  weighting: number,
  rank2Factor: number,
  rank3Factor: number
) => {
  switch (rank) {
    case 1:
      return weighting;
    case 2:
      return weighting / rank2Factor;
    case 3:
      return weighting / rank3Factor;
    default:
      return 0
  }
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

  const allFactors = await getAllMultipliers();
  const ranking2Factor = allFactors[0].rank2Multiplier;
  const ranking3Factor = allFactors[0].rank3Multiplier;

  //creates a map of question -> {answerId: weights}
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

    const answerMap = questionsMap.get(questionNumber);

    for (const [answerId, rank] of Object.entries(rankings)) {
      // get the necessary weights
      const answerData = answerMap.get(answerId);
      const { weightings } = answerData;

      // loop through spec weights updating specRes
      Object.keys(weightings).forEach((key) => {
        const value = weightings[key];
        const rankUpdateValue = getRankingUpdateValue(
          rank,
          value,
          ranking2Factor,
          ranking3Factor
        );
        specResults[key] += rankUpdateValue;
      });
    }
  }

  return;
};
