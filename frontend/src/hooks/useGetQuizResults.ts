import { useQuery } from "@tanstack/react-query";
import { SpecSummary, mockGetQuizResults } from "../util/mockResultsData";

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
