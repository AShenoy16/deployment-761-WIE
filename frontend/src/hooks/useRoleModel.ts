import { IRoleModel } from "../types/RoleModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRoleModelType } from "../components/rolemodel/AddRoleModelModal";
import { getRoleModels, postRoleModel } from "../services/RoleModelService";

export const useGetRoleModels = () => {
  const {
    data: roleModelsResult = [],
    isLoading,
    isError,
  } = useQuery<IRoleModel[]>({
    queryKey: ["RoleModels"],
    queryFn: async () => {
      const data = await getRoleModels();
      return data;
    },
  });

  return { roleModelsResult, isLoading, isError };
};

export const useAddRoleModel = async () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (roleModel: addRoleModelType) => {
      const data = await postRoleModel(roleModel);
      return data;
    },
    onSuccess: (newRoleModel) => {
      queryClient.setQueryData(
        ["RoleModels"],
        (oldData: IRoleModel[] | undefined) => {
          const previousData = oldData ?? [];
          return [...previousData, newRoleModel];
        }
      );
      console.log("role model added"); // For testing purposes
    },
    onError: (error) => {
      console.error("Error adding role model:", error);
    },
  });

  return mutation;
};
