import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IQuestion } from "../types/Question";
import { mockFetchQuizQuestions } from "../util/mockQuizData";
import { deleteQuizQuestion } from "../services/QuizService";

export const useQuestions = () => {
  const queryClient = useQueryClient();

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery<IQuestion[]>({
    queryKey: ["questions"],
    queryFn: mockFetchQuizQuestions, // TODO: Replace with actual API call later
  });

  const deleteMutation = useMutation({
    mutationFn: (question: IQuestion) =>
      deleteQuizQuestion(question._id, question.questionType),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
    onError: (error) => console.error("Failed to delete the question", error),
  });

  return { questions, isLoading, isError, deleteMutation };
};
