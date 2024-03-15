"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

// Not used, for future implementation of authorization

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // If no user has been chosen set it as 1
    const userIdCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user_id"));
    if (!userIdCookie) {
      document.cookie = "user_id=1; path=/; max-age=31536000"; // max-age set to one year
    }

    router.push("/discover");
  }, []);

  return <></>;
}
