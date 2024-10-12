import {
  getInitialSpecResults,
  specAbbreviationMap,
} from "../constants/quizConstants";
import { IMCQAnswerOption, IQuestion } from "../models/interfaces";
import Quiz from "../models/QuizModel";
import { QuizSubmissionRequest } from "../types/quizTypes";
import { isQuizSubmissionRequest } from "../validation/quizValidation";
import RankingQuestion from "../models/RankingModel";
import SliderQuestion from "../models/SliderModel";
import MCQQuestion from "../models/MCQModel";
import mongoose from "mongoose";
import { getAllMultipliers } from "./multiplierService";
import { defaultQuizQuestions } from "../constants/quizConstants";
import Specialization from "../models/SpecializationModel";

/**
 * Service to process quiz submission and calculate results.
 * Aggregates scores from MCQ, slider, and ranking questions, and returns the top three specializations.
 * @param {QuizSubmissionRequest} quizSubmission - The quiz submission data from the user.
 * @returns {Promise<any[]> | null} - Returns an array of top three specializations with their scores or null if an error occurs.
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
 * Retrieves the quiz from the database if present.
 * @returns {Promise<IQuestion[]> | null} - Returns an array of quiz questions or null if not found.
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

/**
 * Fetches MCQ (Multiple Choice Questions) from the database based on provided IDs.
 * Uses aggregation to retrieve the MCQ questions, excluding unnecessary fields like `createdAt`, `updatedAt`, and `__v`.
 * @param {any[]} ids - An array of MCQ question IDs to fetch.
 * @returns {Promise<any[]>} - Returns a promise that resolves to an array of MCQ questions.
 */
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

/**
 * Fetches Slider questions from the database based on provided IDs.
 * Uses aggregation to retrieve the questions, excluding certain fields like `createdAt`, `updatedAt`, and `__v`.
 * @param {any[]} ids - An array of Slider question IDs to fetch.
 * @returns {Promise<any[]>} - Returns a promise that resolves to an array of Slider questions.
 */
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

/**
 * Fetches Ranking questions from the database based on provided IDs.
 * Uses aggregation to retrieve the questions, excluding certain fields like `createdAt`, `updatedAt`, and `__v`.
 * @param {any[]} ids - An array of Ranking question IDs to fetch.
 * @returns {Promise<any[]>} - Returns a promise that resolves to an array of Ranking questions.
 */
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

/**
 * Retrieves all quiz question IDs from the Quiz collection in the database.
 * This function assumes there is only one quiz document, and it extracts the `quizQuestions` field, which is an array of question IDs.
 * @returns {Promise<string[]>} - Returns a promise that resolves to an array of quiz question IDs.
 */
const getQuizIds = async () => {
  const ids = await Quiz.find().select("quizQuestions");
  return ids[0].quizQuestions;
};

/**
 * Processes MCQ results and updates the spec map based on the user's answers.
 * @param {Object} mcqAnswers - Object containing MCQ question IDs and their corresponding selected answers.
 * @param {Object} specResults - Object containing the current specialization results map.
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
 * Calculates the weighting value based on slider choice, weighting, and slider factor.
 * @param {number} sliderChoice - The slider choice (1-5) selected by the user.
 * @param {number} weighting - The weighting of the specialization.
 * @param {number} sliderFactor - The slider factor from the multiplier data.
 * @returns {number} - The calculated weighting value.
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
 * Updates the spec map based on slider question results.
 * @param {Object} sliderAnswers - Object containing slider question IDs and their corresponding slider choices.
 * @param {Object} specResults - Object containing the current specialization results map.
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
 * Calculates the ranking update value based on the rank of the answer.
 * @param {number} rank - The rank (1, 2, or 3) assigned by the user.
 * @param {number} weighting - The weighting of the specialization.
 * @param {number} rank2Factor - The factor for second-ranked answers.
 * @param {number} rank3Factor - The factor for third-ranked answers.
 * @returns {number} - The calculated update value.
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
 * Updates the spec map based on ranking question results.
 * @param {Object} rankingAnswers - Object containing ranking question IDs and their rankings for each answer option.
 * @param {Object} specResults - Object containing the current specialization results map.
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
 * Deletes a quiz question from the database.
 * This operation is handled as a transaction to ensure the question is removed from both the quiz and question collections.
 * @param {string} id - The ID of the question to delete.
 * @param {string} questionType - The type of question to delete (MCQ, Ranking, or Slider).
 * @returns {Promise<number | null>} - Returns 1 if the deletion is successful, otherwise null.
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
 * Checks if a given question type is valid.
 * @param {string} qType - The question type to validate.
 * @returns {boolean} - Returns true if the question type is valid, otherwise false.
 */
export const isValidQuestionType = (qType: string) => {
  return qType == "MCQ" || qType == "Ranking" || qType == "Slider";
};

/**
 * Adds a default quiz question of the specified type and adds it to the quiz collection.
 * @param {string} questionType - The type of question to add (MCQ, Slider, or Ranking).
 * @returns {Promise<any>} - Returns the updated quiz document.
 * @throws {Error} - Throws an error if the question type is invalid.
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
 * Updates an existing quiz question by its ID.
 * @param {string} id - The ID of the question to update.
 * @param {any} updatedData - The new data for the quiz question.
 * @returns {Promise<IQuestion | null>} - Returns the updated question or null if not found.
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
 * Validates the updated question data to ensure no default specialization weightings are present.
 * @param {IQuestion} updatedData - The updated quiz question data.
 * @returns {boolean} - Returns true if the data is valid, false otherwise.
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

/**
 * Retrieves the details of a specialization by its name.
 * @param {string} specializationName - The name of the specialization.
 * @returns {Promise<any>} - Returns the specialization details or null if not found.
 */
export const getSpecializationDetails = async (specializationName: string) => {
  return await Specialization.findOne({ name: specializationName })
    .select("name description careerPathways")
    .lean();
};
