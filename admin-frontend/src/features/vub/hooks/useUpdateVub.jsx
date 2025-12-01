import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVubAPI } from "../vubApi";

export const useUpdateVub = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVubAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
