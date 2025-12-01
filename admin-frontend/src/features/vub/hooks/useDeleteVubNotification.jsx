import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNotificationAPI } from "../vubApi";

export const useDeleteVubNotification = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotificationAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-notifications"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
