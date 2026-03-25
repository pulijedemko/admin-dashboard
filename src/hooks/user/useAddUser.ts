import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from "../../services/user";

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (error) => {
      console.error("Failed to add user:", error);
    },
  });
};
