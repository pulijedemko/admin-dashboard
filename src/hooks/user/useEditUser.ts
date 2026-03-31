import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../../services/user";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      full_name,
      email,
      role,
    }: {
      id: string;
      full_name: string;
      email: string;
      role: string;
    }) => editUser(id, full_name, email, role),
    onSuccess: () => {
      // Invalidate the "users" query so React Query refetches the updated list
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // Optionally, invalidate the current user's profile if it was edited
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error) => {
      console.error("Failed to edit user:", error);
    },
  });
};
