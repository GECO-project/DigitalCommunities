import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useState } from "react";
import { Community } from "@/app/types";
import CommunityDrawer from "./communityDrawer";

export default function CommunityCard({ community }: { community: Community }) {
  const [isOpen, setIsOpen] = useState(false);

  const setDrawer = () => {
    console.log("setDrawer");
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={() => setIsOpen(true)}>
      <Card className="w-9/10 h-[w] mt-2 bg-green-100 rounded-lg overflow-hidden transition-all ease-in-out duration-300 hover:shadow-xl">
        <CardHeader className="flex items-center justify-center mt-10">
          <CardTitle>{community.name}</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col justify-start items-start pl-4 pb-2">
          <CardDescription>{community.address}</CardDescription>
        </CardFooter>
      </Card>
      {isOpen && (
        <CommunityDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setDrawer={setDrawer}
          community={community}
        />
      )}
    </div>
  );
}
