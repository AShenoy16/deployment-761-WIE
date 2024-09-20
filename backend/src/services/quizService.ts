import { spec } from "node:test/reporters";
import {
  getInitialSpecResults,
  specAbbreviationMap,
} from "../constants/quizConstants";
import {
  IMCQAnswerOption,
  IQuestion,
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
import { ParamsDictionary } from "express-serve-static-core";
import { defaultQuizQuestions } from "../constants/quizConstants";
import Specialization from "../models/SpecializationModel";

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

    const topSpecs = Object.entries(roundedSpecMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    const topSpecDetails = await Promise.all(
      topSpecs.map(async ([specAbbreviation, score]) => {
        const fullSpecName = specAbbreviationMap[specAbbreviation];
        const specDetails = await getSpecializationDetails(fullSpecName);

        return {
          ...specDetails,
          score,
        };
      })
    );

    // return top three specs
    return topSpecDetails;
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
      return 0;
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

/**
 * Service that deletes quiz question by id from db
 * @param id - string representing question Id
 * @param questionType - string representing question type
 */
export const deleteQuestion = async (id: string, questionType: string) => {
  // create transaction to delete question from both, otherwise rollback
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Step 1: Remove the question ID from the quizQuestions array in the Quiz collection
    const quizResult = await Quiz.updateOne(
      { quizQuestions: id }, // Match the quiz containing the question ID
      { $pull: { quizQuestions: id } }, // Remove the question ID from the array
      { session }
    );

    if (quizResult.modifiedCount === 0) {
      // If the question ID is not found in the Quiz collection
      await session.abortTransaction();
      return null;
    }

    // Step 2: Delete question from the appropriate question type collection
    let questionResult;
    switch (questionType) {
      case "MCQ":
        questionResult = await MCQQuestion.findByIdAndDelete(
          { _id: id },
          { session }
        );
        break;

      case "Ranking":
        questionResult = await RankingQuestion.findByIdAndDelete(
          { _id: id },
          { session }
        );
        break;

      case "Slider":
        questionResult = await SliderQuestion.findByIdAndDelete(
          { _id: id },
          { session }
        );
        break;

      default:
        await session.abortTransaction();
        return null;
    }

    // If the question is not found in the specific question collection
    if (!questionResult) {
      await session.abortTransaction();
      return null;
    }

    // Step 3: If both are successful, commit the transaction
    await session.commitTransaction();
    return 1;
  } catch (error) {
    // If any error happens, abort the transaction
    await session.abortTransaction();
    throw new Error("Network error");
  } finally {
    session.endSession();
  }
};

/**
 * Check if question type is one of the valid question types
 * @param qType string containing question type
 * @returns
 */
export const isValidQuestionType = (qType: string) => {
  return qType == "MCQ" || qType == "Ranking" || qType == "Slider";
};

/**
 * Service to add a new default quiz question and add to the existing quiz collection
 * @param questionType
 * @returns
 */
export const addDefaultQuizQuestion = async (questionType: string) => {
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
      throw new Error("Invalid question type");
  }

  const savedQuestion = await question.save();

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    "66e7dec2d3a7d9b993ab463a", // Currently hardcoded as there is only one document in quiz collection
    { $push: { quizQuestions: savedQuestion._id } },
    { new: true, useFindAndModify: false, runValidators: true }
  ).populate("quizQuestions");

  return updatedQuiz;
};

/**
 * Service to update an existing quiz question
 * @param id The question ID to update
 * @param questionData The new data for the quiz question
 * @returns The updated question or null if not found
 */
export const updateQuestionById = async (id: string, updatedData: any) => {
  let updatedQuestion: IQuestion | null = null;

  if (updatedData.questionType === "MCQ") {
    updatedQuestion = await MCQQuestion.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  } else if (updatedData.questionType === "Slider") {
    updatedQuestion = await SliderQuestion.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  } else if (updatedData.questionType === "Ranking") {
    updatedQuestion = await RankingQuestion.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
  } else {
    throw new Error("Invalid question type");
  }

  return updatedQuestion;
};

/**
 * Validates the updatedData to make sure there are no default spec weightings
 * @param updatedData
 * @returns {boolean} - True if valid, false if invalid
 */
export const isValidUpdatedQuestionData = (updatedData: IQuestion): boolean => {
  if (
    updatedData.questionType === "MCQ" ||
    updatedData.questionType === "Ranking"
  ) {
    return updatedData.answerOptions.every((option) =>
      Object.keys(option.weightings).every(
        (specializationName) => !specializationName.includes("New Spec")
      )
    );
  } else if (updatedData.questionType === "Slider") {
    return Object.keys(updatedData.sliderWeights.weightings).every(
      (specializationName) => !specializationName.includes("New Spec")
    );
  }

  return false;
};

export const getSpecializationDetails = async (specializationName: string) => {
  return await Specialization.findOne({ name: specializationName })
    .select("name description careerPathways")
    .lean();
};
