import { useQuery } from "@tanstack/react-query";
import { IQuestion } from "../types/QuestionTypes";
import { mockFetchQuizQuestions } from "../util/mockQuizData";

export const useGetQuestions = () => {
  const {
    data: questions = [], // Default to empty array if questions is undefined
    isLoading,
    isError,
  } = useQuery<IQuestion[]>({
    queryKey: ["questions"],
    queryFn: mockFetchQuizQuestions, // TODO: Replace with actual API call later
  });

  return { questions, isLoading, isError };
};
