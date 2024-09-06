import { IRoleModel } from "../types/RoleModel";
import { useQuery } from "@tanstack/react-query";
import { mockRoleModels } from "../util/mockRoleModelData";

export const getRoleModels = () => {
  const {
    data: roleModelsResult = [],
    isLoading,
    isError,
  } = useQuery<IRoleModel[]>({
    queryKey: ["getRoleModels"],
    queryFn: mockRoleModels, // TODO: Replace with actual API call later
  });

  return { roleModelsResult, isLoading, isError };
};
