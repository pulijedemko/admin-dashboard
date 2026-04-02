import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { supabase } from "../../services/supabaseClient";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, userId }: { file: File; userId: string }) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true, contentType: file.type });

      if (error) throw error;

      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

      if (!data.publicUrl) throw new Error("Failed to get public URL");

      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar: data.publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      return data.publicUrl;
    },

    onMutate: () => {
      return { toastId: toast.loading("Uploading avatar...") };
    },

    onSuccess: (_data, _variables, context) => {
      toast.update(context.toastId, {
        render: "Upload complete ✅",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      // Invalidate so ProfilePage re-fetches the new avatar URL
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },

    onError: (_error, _variables, context) => {
      if (context?.toastId) {
        toast.update(context.toastId, {
          render: "Upload failed ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    },
  });
};
