import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVubAccountAPI } from "../vubApi.jsx";

export const useCreateVubAccount = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVubAccountAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
