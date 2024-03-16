"use server";

import { createClient } from "../../utils/supabase/server";
import { cookies } from "next/headers";

export async function getCommunitiesForUser(userId:number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userCommunities, error } = await supabase
    .from("user_communities")
    .select("community_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user-community relations:", error.message);
    return [];
  }

  const communityIds = userCommunities.map(
    (userCommunity) => userCommunity.community_id
  );

  const { data: communities, error: communitiesError } = await supabase
    .from("communities")
    .select("*")
    .in("id", communityIds);

  if (communitiesError) {
    console.error("Error fetching communities:", communitiesError.message);
    return [];
  }

  return communities;
}
