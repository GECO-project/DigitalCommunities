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

export async function getAllCommunities() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: communities, error } = await supabase
    .from("communities")
    .select("*");

  if (error) {
    console.error("Error fetching communities:", error.message);
    return [];
  }

  return communities;
}

export async function getIsUserMemberOfCommunity(userId:number, communityId:number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userCommunities, error } = await supabase
    .from("user_communities")
    .select("community_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user-community relations:", error.message);
    return false;
  }

  const communityIds = userCommunities.map(
    (userCommunity) => userCommunity.community_id
  );

  return communityIds.includes(communityId);
}

export async function registerForCommunity(userId:number, communityId:number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("user_communities").insert([
    { user_id: userId, community_id: communityId }
  ]);
  
  if (error) {
    console.error("Error registering for community:", error.message);
    return false;
  }

  return true;
}

export async function unregisterFromCommunity(userId:number, communityId:number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_communities")
    .delete()
    .eq("user_id", userId)
    .eq("community_id", communityId);

  if (error) {
    console.error("Error unregistering from community:", error.message);
    return false;
  }

  return true;
}
