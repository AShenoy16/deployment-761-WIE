import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IQuestion, QuizSubmissionRequest } from "../types/Question";
import {
  addQuizQuestion,
  deleteQuizQuestion,
  updateQuizQuestion,
  getAllQuizQuestions,
  calculateQuizResults,
} from "../services/QuizService";
import { SpecSummary } from "../types/Specialization";

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

  const updateMutation = useMutation({
    mutationFn: (question: IQuestion) => updateQuizQuestion(question),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
    onError: (error) => console.error("Failed to edit the question", error),
  });

  return {
    questions,
    isLoading,
    isError,
    deleteMutation,
    addMutation,
    updateMutation,
  };
};

export const useCalculateQuizResults = (
  quizSubmissionRequest: QuizSubmissionRequest
) => {
  const {
    data: quizResults = [],
    isLoading,
    isError,
  } = useQuery<SpecSummary[]>({
    queryKey: ["quizResults", quizSubmissionRequest],
    queryFn: () => calculateQuizResults(quizSubmissionRequest),
  });

  return { quizResults, isLoading, isError };
};
