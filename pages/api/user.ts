"use server";

import { createClient } from "../../utils/supabase/server";
import { cookies } from "next/headers";

export async function getUser(userId: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  return user;
}
