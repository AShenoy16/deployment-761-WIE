import { IRoleModel } from "../types/RoleModel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRoleModelType } from "../components/rolemodel/AddUpdateRoleModelModal";
import {
  deleteRoleModel,
  getRoleModels,
  postRoleModel,
  putRoleModel,
} from "../services/RoleModelService";
import useSnackBar from "./useSnackBar";

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
  const showSnackbar = useSnackBar();

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
      showSnackbar("Successfully added role model");
    },
    onError: (error) => {
      showSnackbar("Error adding role model, please try again");
      console.error("Error adding role model:", error);
    },
  });

  return mutation;
};

export const useDeleteRoleModel = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackBar();

  const mutation = useMutation<void, Error, string>({
    mutationFn: async (roleModelId: string) => {
      await deleteRoleModel(roleModelId);
    },
    onSuccess: () => {
      // Invalidate the role models query to refresh the list after deletion
      queryClient.invalidateQueries({ queryKey: ["RoleModels"] });
      showSnackbar("Successfully deleted role model");
    },
    onError: (error) => {
      console.error("Error deleting role model:", error);
      showSnackbar("Error deleting role model, please try again");
    },
  });

  return { mutation };
};

export const usePutRoleModel = () => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackBar();

  const mutation = useMutation<IRoleModel, Error, IRoleModel>({
    mutationFn: async (roleModel: IRoleModel) => {
      const data = await putRoleModel(roleModel);
      return data;
    },
    onSuccess: (updatedRoleModel) => {
      queryClient.setQueryData(
        ["RoleModels"],
        (oldData: IRoleModel[] | undefined) => {
          const previousData = oldData ?? [];
          return previousData.map((role) =>
            role._id === updatedRoleModel._id ? updatedRoleModel : role
          ); // Update the role model in the query cache
        }
      );
      showSnackbar("Successfully updated role model");
    },
    onError: (error) => {
      showSnackbar("Error updating role model, please try again");
      console.error("Error updating role model:", error);
    },
  });

  return mutation;
};
