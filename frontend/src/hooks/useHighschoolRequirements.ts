import { useQuery } from "@tanstack/react-query";
import { IHighschoolRequirement } from "../types/HighschoolRequirements";
import { fetchHighschoolRequirements } from "../services/HighschoolRequirementsService";

export const useHighschoolRequirements = () => {
  const {
    data: highschoolRequirements = [],
    isLoading,
    isError,
  } = useQuery<IHighschoolRequirement[]>({
    queryKey: ["highschoolRequirements"],
    queryFn: fetchHighschoolRequirements,
  });

  return {
    highschoolRequirements,
    isLoading,
    isError,
  };
};
