"use client";

import { TypographyH1, TypographyH4 } from "@/components/ui/typography";
import { getAllEvents } from "@/pages/api/events";
import { useEffect, useState } from "react";
import EventCard from "@/components/eventCard";
import { Event } from "../types";

export default function Page() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getAllEvents();
      setAllEvents(events ? events : []);
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <div className="mt-10">
        <TypographyH1 text="Sök" />
      </div>

      <div className="pb-20">
        {allEvents.map((event: Event) => (
          <div key={event.id} className="mb-4">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
}
