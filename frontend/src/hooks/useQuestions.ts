import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IQuestion } from "../types/Question";
import {
  addQuizQuestion,
  deleteQuizQuestion,
  getAllQuizQuestions,
} from "../services/QuizService";

export const useQuestions = () => {
  const queryClient = useQueryClient();

  const {
    data: questions = [],
    isLoading,
    isError,
  } = useQuery<IQuestion[]>({
    queryKey: ["questions"],
    queryFn: getAllQuizQuestions,
  });

  const deleteMutation = useMutation({
    mutationFn: (question: IQuestion) =>
      deleteQuizQuestion(question._id, question.questionType),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
    onError: (error) => console.error("Failed to delete the question", error),
  });

  const addMutation = useMutation({
    mutationFn: (questionType: IQuestion["questionType"]) =>
      addQuizQuestion(questionType),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
    onError: (error) => console.error("Failed to add the question", error),
  });

  return { questions, isLoading, isError, deleteMutation, addMutation };
};
