import { Game } from "@/data/games";

export function isValidIframeUrl(url: string): boolean {
  if (!url || !url.startsWith("https://")) return false;
  return url.includes("gamedistribution") || url.includes("gamemonetize");
}

export function validateGame(game: Game): boolean {
  return isValidIframeUrl(game.iframe_url);
}
