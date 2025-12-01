import { useQuery } from "@tanstack/react-query";
import { getVubAccountsAPI } from "../vubApi";

export const useVubAccounts = ({ id, enabled = true }) => {
  return useQuery({
    queryKey: ["vub-accounts"],
    queryFn: () => getVubAccountsAPI({ id }),
    refetchOnWindowFocus: false,
    enabled,
    initialData: [],
  });
};
