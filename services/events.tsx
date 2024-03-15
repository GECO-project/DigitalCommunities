"use server";

import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";

export async function getAllEvents() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: events } = await supabase.from("events").select();

  return events;
}

export async function registerForEvent(eventId: number, userId: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_events")
    .insert([{ event_id: eventId, user_id: userId }]);

  if (error) {
    console.error("Error inserting user-event relation:", error.message);
    return false;
  }

  return true;
}

export async function getEventsForUser(userId: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userEvents, error } = await supabase
    .from("user_events")
    .select("event_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user-event relations:", error.message);
    return [];
  }

  const eventIds = userEvents.map((userEvent) => userEvent.event_id);

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .in("id", eventIds);

  if (eventsError) {
    console.error("Error fetching events:", eventsError.message);
    return [];
  }

  return events;
}
