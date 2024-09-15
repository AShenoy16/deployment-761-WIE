import axios from "axios";
import { IMultiplierData, IQuestion } from "../types/Question";

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
