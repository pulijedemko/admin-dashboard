import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/user";

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
};
