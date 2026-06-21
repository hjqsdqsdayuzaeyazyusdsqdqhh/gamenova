"use client";

import { useEffect } from "react";
import { addRecentlyPlayed } from "@/lib/storage";

interface Props {
  gameId: number;
}

export default function RecentlyPlayedTracker({ gameId }: Props) {
  useEffect(() => {
    addRecentlyPlayed(gameId);
  }, [gameId]);

  return null;
}
