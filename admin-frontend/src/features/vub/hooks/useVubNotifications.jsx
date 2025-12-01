import { useQuery } from "@tanstack/react-query";
import { getNotificationAPI } from "../vubApi";

export const useVubNotifications = ({ id, enabled = true }) => {
  return useQuery({
    queryKey: ["vub-notifications"],
    queryFn: () => getNotificationAPI({ id }),
    refetchOnWindowFocus: false,
    enabled,
    initialData: [],
  });
};
