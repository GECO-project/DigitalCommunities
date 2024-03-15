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
import { Dispatch, SetStateAction } from "react";
import { Event } from "@/app/types";
import { TypographyH3, TypographyH4, TypographyP } from "./ui/typography";
import { ScrollArea } from "./ui/scroll-area";
import { registerForEvent } from "@/services/events";

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
  let userIdCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_id"));

  if (!userIdCookie) {
    document.cookie = "user_id=1; path=/; max-age=31536000"; // max-age set to one year
    userIdCookie = "user_id=1";
  }

  const userId = parseInt(userIdCookie.split("=")[1], 10);

  const onSubmit = async () => {
    console.log("onSubmit");
    const res = await registerForEvent(event.id, userId);
    console.log(res);
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
            <Button onClick={onSubmit}>Anmäl</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
