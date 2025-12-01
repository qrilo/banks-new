import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationAPI } from "../vubApi";

export const useUpdateVubNotificaion = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateNotificationAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-notifications"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
