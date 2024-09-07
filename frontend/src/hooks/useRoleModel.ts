import { IRoleModel } from "../types/RoleModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRoleModelType } from "../components/rolemodel/AddRoleModelModal";
import {
  deleteRoleModel,
  getRoleModels,
  postRoleModel,
} from "../services/RoleModelService";

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
    },
    onError: (error) => {
      console.error("Error adding role model:", error);
    },
  });

  return mutation;
};

export const useDeleteRoleModel = async () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (roleModelId: string) => {
      await deleteRoleModel(roleModelId);
    },
    onSuccess: () => {
      // Invalidate the role models query to refresh the list after deletion
      queryClient.invalidateQueries({ queryKey: ["RoleModels"] });
    },
    onError: (error) => {
      console.error("Error deleting role model:", error);
    },
  });
};
