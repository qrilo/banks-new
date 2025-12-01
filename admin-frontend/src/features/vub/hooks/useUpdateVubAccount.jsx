import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVubAccountAPI } from "../vubApi";

export const useUpdateVubAccount = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVubAccountAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-accounts"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
