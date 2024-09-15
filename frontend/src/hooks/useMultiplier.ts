import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getQuizQuestionMultipliers,
  updateMultiplier,
} from "../services/QuizService";
import { IMultiplierData } from "../types/Question";

export const useMultiplier = () => {
  const queryClient = useQueryClient();

  const {
    data: multipliers,
    isLoading,
    isError,
  } = useQuery<IMultiplierData>({
    queryKey: ["multiplier"],
    queryFn: getQuizQuestionMultipliers,
  });

  // Mutation to update multipliers
  const updateMultiplierMutation = useMutation({
    mutationFn: (updatedMultipliers: IMultiplierData) =>
      updateMultiplier(updatedMultipliers), // The update function for multipliers
    onSuccess: () => {
      // Invalidate the multiplier query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ["multiplier"] });
      console.log("Multipliers updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update the multipliers", error);
    },
  });

  return { multipliers, updateMultiplierMutation, isLoading, isError };
};
