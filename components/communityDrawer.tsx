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
  getIsUserMemberOfCommunity,
  registerForCommunity,
  unregisterFromCommunity
} from "@/pages/api/communities";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Community } from "@/app/types";
import { TypographyH2, TypographyH4, TypographyP } from "./ui/typography";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

interface CommunityDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  community: Community;
  setDrawer: () => void;
}

export default function EventDrawer({
  isOpen,
  setIsOpen,
  community
}: CommunityDrawerProps) {
  const [userId, setUserId] = useState<number>(-1);
  const [isMember, setIsMember] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    let userIdCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id"));

    let id = userIdCookie ? parseInt(userIdCookie.split("=")[1], 10) : -1;
    setUserId(id);
    const fetchUser = async () => {
      const userData = await getIsUserMemberOfCommunity(community.id, userId);
      setIsMember(userData);
    };
    fetchUser();
  }, [community.id, userId]);

  const onSubmit = async () => {
    if (isMember) {
      let res = await unregisterFromCommunity(community.id, userId);
      setIsMember(false);
      if (res === true) {
        toast({
          title: "Godkänd avanmälan",
          description: "Du är inte längre medlem i " + community.name
        });
      }
    } else {
      const res = await registerForCommunity(community.id, userId);
      if (res === true) {
        toast({
          title: "Godkänd anmälan",
          description: "Du har nu gått med i " + community.name
        });
      }
      setIsMember(res);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="flex flex-col justify-between min-h-[65vh] max-h-[70dvh]">
        <div className="overflow-auto">
          <DrawerHeader>
            <div className="flex items-center justify-center space-x-4 pt-12 ">
              <img
                src=""
                alt="img"
                className="w-20 h-20 bg-yellow-100 rounded-full"
              />
              <TypographyH2 text={community.name} />
            </div>
            <DrawerDescription className="text-left flex flex-col pt-10">
              <div>email.email@google.se</div>
              <div>{community.address}</div>
            </DrawerDescription>
            <div className="text-left mb-12">
              <div className="mt-6">
                <TypographyH4 text={"Om"} />
              </div>
              <ScrollArea>
                <TypographyP text={community.description} />
              </ScrollArea>
            </div>
          </DrawerHeader>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            {isMember ? (
              <Button onClick={onSubmit} variant="destructive">
                Gå ur {community.name}
              </Button>
            ) : (
              <Button onClick={onSubmit}>Gå med {community.name}</Button>
            )}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
