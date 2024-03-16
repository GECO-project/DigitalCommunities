import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  isUserRegisteredForEvent,
  unregisterFromEvent
} from "@/pages/api/events";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Event } from "@/app/types";
import { TypographyH3, TypographyH4, TypographyP } from "./ui/typography";
import { ScrollArea } from "./ui/scroll-area";
import { registerForEvent } from "@/pages/api/events";

interface EventDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  event: Event;
  setDrawer: () => void;
}

export default function EventDrawer({
  isOpen,
  setIsOpen,
  event
}: EventDrawerProps) {
  const [userId, setUserId] = useState<number>(-1);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    let userIdCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id"));

    let id = userIdCookie ? parseInt(userIdCookie.split("=")[1], 10) : -1;
    setUserId(id);
    const fetchUser = async () => {
      const userData = await isUserRegisteredForEvent(event.id, userId);
      console.log("userData", userData);
      setIsRegistered(userData);
    };
    fetchUser();
  }, [event.id, userId]);

  const onSubmit = async () => {
    if (isRegistered) {
      unregisterFromEvent(event.id, userId);
    } else {
      const res = await registerForEvent(event.id, userId);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="flex flex-col justify-between max-h-[70vh]">
        <div className="overflow-auto">
          <DrawerHeader>
            <div className="flex justify-between items-start">
              <img
                src="../app/favicon.ico"
                alt="event image"
                className="w-full h-40 bg-blue-100"
              />
            </div>

            <DrawerTitle className="text-left mt-2">
              <TypographyH3 text={event.title} />
            </DrawerTitle>
            <DrawerDescription className="text-left flex flex-col">
              <div>{event.community_name}</div>
              <div>{event.date}</div>
              <div>{event.address}</div>
            </DrawerDescription>
            <div className="text-left mb-12">
              <div className="mt-6">
                <TypographyH4 text={"Info"} />
              </div>
              <ScrollArea>
                <TypographyP text={event.description} />
              </ScrollArea>
            </div>
          </DrawerHeader>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            {isRegistered ? (
              <Button variant="destructive">Avanmäl</Button>
            ) : (
              <Button onClick={onSubmit}>Anmäl</Button>
            )}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
