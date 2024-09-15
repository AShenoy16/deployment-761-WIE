import axios from "axios";
import { IQuestion } from "../types/Question";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const deleteQuizQuestion = async (
  questionId: string,
  questionType: IQuestion["questionType"]
) => {
  await axios.delete(`${API_BASE_URL}/quiz/${questionId}`, {
    data: {
      questionType,
    },
  });
};
