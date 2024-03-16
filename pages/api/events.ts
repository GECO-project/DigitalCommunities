"use server";

import { createClient } from "../../utils/supabase/server";
import { cookies } from "next/headers";

// Returns all events
export async function getAllEvents() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: events } = await supabase.from("events").select();

  return events;
}

// Given an eventId and a userId, registers the user for the event
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

// Given an eventId and a userId, unregisters the user from the event
export async function unregisterFromEvent(eventId: number, userId: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_events")
    .delete()
    .match({ event_id: eventId, user_id: userId });

  if (error) {
    console.error("Error deleting user-event relation:", error.message);
    return false;
  }

  return true;
}

// Given a userId, returns all events the user is registered for
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

// Given an eventId and userId, returns whether the user is registered for the event
// Returns true if the user is registered, false otherwise
export async function isUserRegisteredForEvent(
  eventId: number,
  userId: number
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userEvents, error } = await supabase
    .from("user_events")
    .select("*")
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user-event relation:", error.message);
    return false;
  }

  return userEvents.length > 0;
}
