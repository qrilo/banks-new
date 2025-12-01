import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransactionAPI } from "../vubApi.jsx";

export const useCreateTransaction = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransactionAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
