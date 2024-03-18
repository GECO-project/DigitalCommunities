"use client";

import { TypographyH1, TypographyH4 } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { getAllEvents } from "@/pages/api/events";
import { getAllCommunities } from "@/pages/api/communities";
import { useEffect, useState } from "react";
import EventCard from "@/components/eventCard";
import { Event, Community } from "../types";
import CommunityCard from "@/components/communityCard";

export default function Page() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>(
    []
  );

  useEffect(() => {
    setFilteredEvents(
      allEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.community_name.toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredCommunities(
      allCommunities.filter((community) =>
        community.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allEvents, allCommunities]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getAllEvents();
      setAllEvents(events ? events : []);
      const communities = await getAllCommunities();
      setAllCommunities(communities ? communities : []);
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <div className="mt-10">
        <TypographyH1 text="Sök" />
      </div>

      <div className="mt-5 mb-5">
        <Input
          placeholder="Sök efter event eller grannskap"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <TypographyH4 text="Resultat" />
      </div>

      <div>
        {filteredEvents.map((event: Event) => (
          <div key={event.id} className="mb-4">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      <div className="pb-20">
        {filteredCommunities.map((community: Community) => (
          <div key={community.id} className="mb-4">
            <CommunityCard community={community} />
          </div>
        ))}
      </div>
    </div>
  );
}
