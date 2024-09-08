import { IRoleModel } from "../types/RoleModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRoleModelType } from "../components/rolemodel/AddRoleModelModal";
import {
  deleteRoleModel,
  getRoleModels,
  postRoleModel,
} from "../services/RoleModelService";
import { useSnackbarStore } from "../stores/SnackBarStore";

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

export const useAddRoleModel = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IRoleModel, Error, addRoleModelType>({
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

export const useDeleteRoleModel = () => {
  const queryClient = useQueryClient();
  const setMessage = useSnackbarStore((state) => state.setMessage);
  const setIsOpen = useSnackbarStore((state) => state.setIsOpen);

  const triggerSnackbar = (message: string) => {
    setMessage(message);
    setIsOpen(true);
  };

  const mutation = useMutation<void, Error, string>({
    mutationFn: async (roleModelId: string) => {
      await deleteRoleModel(roleModelId);
    },
    onSuccess: () => {
      // Invalidate the role models query to refresh the list after deletion
      queryClient.invalidateQueries({ queryKey: ["RoleModels"] });
      triggerSnackbar("Successfully deleted role model");
    },
    onError: (error) => {
      console.error("Error deleting role model:", error);
      triggerSnackbar("Error deleting role model, please try again");
    },
  });

  return { mutation };
};
