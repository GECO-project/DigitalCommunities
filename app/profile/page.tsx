"use client";

import { Event, User, Community } from "../types";
import { useState, useEffect } from "react";
import { getEventsForUser } from "@/services/events";
import { getUser } from "@/services/user";
import { getCommunitiesForUser } from "@/services/communities";
import EventCard from "@/components/eventCard";
import { TypographyH1, TypographyH4 } from "@/components/ui/typography";

export default function Page() {
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<User>();
  const [userCommunities, setUserCommunities] = useState<Community[]>([]);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    let userIdCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id"));

    if (!userIdCookie) {
      document.cookie = "user_id=1; path=/; max-age=31536000"; // max-age set to one year
      userIdCookie = "user_id=1";
    }

    setUserId(parseInt(userIdCookie.split("=")[1], 10));
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchMyEvents = async () => {
        const eventData = await getEventsForUser(userId);
        setMyEvents(eventData);
      };
      const fetchUser = async () => {
        const userData = await getUser(userId);
        setUser(userData);
      };
      const fetchCommunities = async () => {
        const communityData = await getCommunitiesForUser(userId);
        setUserCommunities(communityData);
      };
      fetchMyEvents();
      fetchUser();
      fetchCommunities();
    }
  }, [userId]);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <div className="flex flex-col justify-start items-start mt-10">
        <TypographyH1 text={user ? user.name : "Loading..."} />
        <TypographyH4 text={user ? user.location : "Loading..."} />
      </div>
      <div className="mt-5">
        <TypographyH4 text="Mina evenemang" />
      </div>
      {myEvents.map((event: Event) => (
        <div key={event.id}>
          <EventCard event={event} />
        </div>
      ))}
      <div className="mt-5">
        <TypographyH4 text="Mina medlemskap" />
      </div>
      {userCommunities.map((community: Community) => (
        <div key={community.id}>
          <div>{community.name}</div>
          <div>{community.address}</div>
        </div>
      ))}
    </div>
  );
}
