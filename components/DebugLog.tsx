"use client";

import { useEffect } from "react";
import { Game } from "@/data/games";

interface Props {
  games: Game[];
  validCount: number;
}

export default function DebugLog({ games, validCount }: Props) {
  useEffect(() => {
    console.log("[GameNova Debug] ============");
    console.log("[GameNova Debug] Total games in data:", games.length);
    console.log("[GameNova Debug] Passed validation:", validCount);
    if (games.length > 0) {
      console.log("[GameNova Debug] First game:", games[0].title, games[0].category, games[0].iframe_url?.slice(0, 50));
      console.log("[GameNova Debug] Last game:", games[games.length - 1].title, games[games.length - 1].category);
    }
    const invalid = games.filter(g => {
      if (!g.iframe_url) return true;
      if (!g.iframe_url.startsWith("https://")) return true;
      return !g.iframe_url.includes("gamedistribution") && !g.iframe_url.includes("gamemonetize");
    });
    if (invalid.length > 0) {
      console.warn("[GameNova Debug] INVALID games:", invalid.map(g => `${g.title} (${g.iframe_url})`));
    }
    console.log("[GameNova Debug] ============");
  }, [games, validCount]);

  return null;
}
