import { useQuery } from "@tanstack/react-query";
import { Question } from "../types/QuestionTypes";
import { mockFetchQuizQuestions } from "../util/mockQuizData";

export const useFetchQuestions = () => {
  const {
    data: questions,
    isLoading,
    isError,
  } = useQuery<Question[]>({
    queryKey: ["questions"],
    queryFn: mockFetchQuizQuestions, // TODO: Replace with actual API call later
  });

  return { questions, isLoading, isError };
};
