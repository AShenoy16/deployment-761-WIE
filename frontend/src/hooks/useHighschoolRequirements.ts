import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IHighschoolRequirement } from "../types/HighschoolRequirements";
import {
  fetchHighschoolRequirements,
  updateHighschoolRequirements,
} from "../services/HighschoolRequirementsService";

export const useHighschoolRequirements = () => {
  const queryClient = useQueryClient();
  const {
    data: highschoolRequirements = [],
    isLoading,
    isError,
  } = useQuery<IHighschoolRequirement[]>({
    queryKey: ["highschoolRequirements"],
    queryFn: fetchHighschoolRequirements,
  });

  const updateMutation = useMutation({
    mutationFn: (highschoolRequirements: IHighschoolRequirement[]) =>
      updateHighschoolRequirements(highschoolRequirements),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["highschoolRequirements"] }),
    onError: (error) =>
      console.error("Failed to update the highschool requirements", error),
  });

  return {
    highschoolRequirements,
    isLoading,
    isError,
    updateMutation,
  };
};
