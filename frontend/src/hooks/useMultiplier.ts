import { useQuery } from "@tanstack/react-query";
import { getQuizQuestionMultipliers } from "../services/QuizService";
import { IMultiplierData } from "../types/Question";

export const useMultiplier = () => {
  const {
    data: multipliers,
    isLoading,
    isError,
  } = useQuery<IMultiplierData>({
    queryKey: ["multiplier"],
    queryFn: getQuizQuestionMultipliers,
  });

  return { multipliers, isLoading, isError };
};
