"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BottomNavigation({}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 w-full flex justify-around items-center border-t border-gray-200 p-4 bg-white">
      <Button
        variant="link"
        className={pathname.startsWith("/discover") ? "font-bold" : ""}
        onClick={() => router.push("/discover")}
      >
        Hem
      </Button>
      <Button variant="link">Grannskap</Button>
      <Button
        variant="link"
        className={pathname.startsWith("/profile") ? "font-bold" : ""}
        onClick={() => router.push("/profile")}
      >
        Profil
      </Button>
    </div>
  );
}
