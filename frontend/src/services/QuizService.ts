import axios from "axios";
import {
  IMultiplierData,
  IQuestion,
  QuizSubmissionRequest,
} from "../types/Question";
import { SpecSummary } from "../types/Specialization";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllQuizQuestions = async (): Promise<IQuestion[]> => {
  const response = await axios.get(`${API_BASE_URL}/quizzes`);
  return response.data;
};

export const deleteQuizQuestion = async (
  questionId: string,
  questionType: IQuestion["questionType"]
) => {
  await axios.delete(`${API_BASE_URL}/quizzes/${questionId}`, {
    data: {
      questionType,
    },
  });
};

export const getQuizQuestionMultipliers =
  async (): Promise<IMultiplierData> => {
    const response = await axios.get(`${API_BASE_URL}/multiplier`);
    return response.data;
  };

export const updateMultiplier = async (
  updatedMultipliers: IMultiplierData
): Promise<IMultiplierData> => {
  const response = await axios.put(
    `${API_BASE_URL}/multiplier`,
    updatedMultipliers
  );
  return response.data;
};

export const addQuizQuestion = async (
  questionType: IQuestion["questionType"]
) => {
  await axios.post(`${API_BASE_URL}/quizzes`, {
    questionType,
  });
};

export const updateQuizQuestion = async (updatedQuestion: IQuestion) => {
  await axios.put(
    `${API_BASE_URL}/quizzes/${updatedQuestion._id}`,
    updatedQuestion
  );
};

export const calculateQuizResults = async (
  quizSubmission: QuizSubmissionRequest
): Promise<SpecSummary[]> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/quizzes/submit`,
      quizSubmission
    );
    const questions = response.data;
    return questions;
  } catch (error) {
    console.error("Error retrieving quiz results:", error);
    throw error; // Throw the error so the query can handle it
  }
};
