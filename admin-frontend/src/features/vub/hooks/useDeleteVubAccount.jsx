import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVubAccountAPI } from "../vubApi.jsx";

export const useDeleteVubAccount = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVubAccountAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
