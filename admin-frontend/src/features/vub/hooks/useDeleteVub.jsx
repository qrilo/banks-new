import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVubAPI } from "../vubApi";

export const useDeleteVub = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVubAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
