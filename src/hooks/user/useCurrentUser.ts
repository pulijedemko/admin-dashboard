import { useQuery } from "@tanstack/react-query";
import { getCurrentUserProfile } from "../../services/user";

export const useCurrentUser = (userId: string) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getCurrentUserProfile(userId),
    enabled: !!userId,
  });
};
