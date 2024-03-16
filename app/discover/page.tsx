"use client";

import { TypographyH1, TypographyH4 } from "@/components/ui/typography";
import { getAllEvents } from "@/pages/api/events";
import { useEffect, useState } from "react";
import EventCard from "@/components/eventCard";
import { Event } from "../types";

export default function Page() {
  const [newEvents, setNewEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getAllEvents();
      setNewEvents(events ? [events[0]] : []);
      setAllEvents(events ? events.slice(1) : []);
    };
    fetchEvents();
  }, []);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      <div className="mt-10">
        <TypographyH1 text="Utforska" />
      </div>
      <div className="mt-5">
        <TypographyH4 text="Nytt för dig" />
      </div>
      {newEvents.map((event: Event) => (
        <div key={event.id}>
          <EventCard event={event} />
        </div>
      ))}

      <div className="mt-5">
        <TypographyH4 text="Alla" />
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
