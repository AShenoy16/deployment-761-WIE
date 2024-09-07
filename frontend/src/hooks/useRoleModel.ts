import { IRoleModel } from "../types/RoleModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mockRoleModels } from "../util/mockRoleModelData";
import axios from "axios";
import { addRoleModelType } from "../components/rolemodel/AddRoleModelModal";

export const getRoleModels = () => {
  const {
    data: roleModelsResult = [],
    isLoading,
    isError,
  } = useQuery<IRoleModel[]>({
    queryKey: ["RoleModels"],
    queryFn: mockRoleModels, // TODO: Replace with actual API call later
  });

  return { roleModelsResult, isLoading, isError };
};

export const useAddRoleModel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (roleModel: addRoleModelType) => {
      return axios.post("/api/role-models", roleModel);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["RoleModels"], (oldData: IRoleModel[]) => {
        return {
          ...oldData,
          data: [...(oldData || []), data],
        };
      });
      console.log("role model added"); // For testing purposes
    },
  });

  return mutation;
};
