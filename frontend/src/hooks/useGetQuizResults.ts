import { useQuery } from "@tanstack/react-query";
import {mockGetQuizResults } from "../util/mockResultsData";
import { SpecSummary } from "../types/Specialization";

export const useGetQuizResults = () => {
  const {
    data: quizResults = [],
    isLoading,
    isError,
  } = useQuery<SpecSummary[]>({
    queryKey: ["quizResults"],
    queryFn: mockGetQuizResults, // TODO: Replace with actual API call later
  });

  return { quizResults, isLoading, isError };
};
