import { supabase } from "./supabaseClient";

export const addUser = async (newUser: any) => {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: any) => {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) throw error;
};

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const getCurrentUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
};
