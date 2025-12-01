import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionAPI } from "../vubApi.jsx";

export const useUpdateTransaction = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransactionAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
