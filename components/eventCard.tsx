import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import EventDrawer from "./eventDrawer";
import { useState } from "react";
import { Event } from "@/app/types";

export default function EventCard({ event }: { event: Event }) {
  const [isOpen, setIsOpen] = useState(false);

  const setDrawer = () => {
    console.log("setDrawer");
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={() => setIsOpen(true)}>
      <Card className="w-9/10 h-[w] mt-2 bg-blue-100 rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl">
        <CardHeader className="flex items-center justify-center mt-10">
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col justify-start items-start pl-4 pb-2">
          <CardDescription>{event.date}</CardDescription>
          <CardDescription>{event.address}</CardDescription>
          <CardDescription>{event.community_name}</CardDescription>
        </CardFooter>
      </Card>
      {isOpen && (
        <EventDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setDrawer={setDrawer}
          event={event}
        />
      )}
    </div>
  );
}
