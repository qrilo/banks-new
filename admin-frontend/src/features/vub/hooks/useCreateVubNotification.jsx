import { App } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNotificationAPI } from "../vubApi.jsx";

export const useCreateVubNotification = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotificationAPI,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["vub-notifications"]);
      message.success("Успешно!");
    },
    onError: (error) => {
      message.error(error.message);
    },
  });
};
