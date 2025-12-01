import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVubAPI } from "../vubApi.jsx";

export const useCreateVub = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVubAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
