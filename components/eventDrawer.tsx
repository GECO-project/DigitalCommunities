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
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    let userIdCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id"));

    let id = userIdCookie ? parseInt(userIdCookie.split("=")[1], 10) : -1;
    setUserId(id);
    const fetchUser = async () => {
      const userData = await isUserRegisteredForEvent(event.id, userId);
      setIsRegistered(userData);
    };
    fetchUser();
  }, [event.id, userId]);

  const onSubmit = async () => {
    if (isRegistered) {
      let res = await unregisterFromEvent(event.id, userId);
      setIsRegistered(false);
      if (res === true) {
        toast({
          title: "Ångrad anmälan",
          description: "Du är inte längre anmäld till eventet"
        });
      }
    } else {
      const res = await registerForEvent(event.id, userId);
      if (res === true) {
        toast({
          title: "Anmäld",
          description: "Du är nu anmäld till eventet"
        });
      }
      setIsRegistered(res);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="flex flex-col justify-between max-h-[75vh]">
        <div className="overflow-auto">
          <DrawerHeader>
            <div className="flex justify-between items-start">
              <img
                src={event.image}
                alt="event image"
                className="w-full h-40"
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
              <Button onClick={onSubmit} variant="destructive">
                Avanmäl
              </Button>
            ) : (
              <Button onClick={onSubmit}>Anmäl</Button>
            )}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
