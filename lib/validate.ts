import { Game } from "@/data/games";

export function isValidIframeUrl(url: string): boolean {
  if (!url || !url.startsWith("https://")) return false;
  if (url.includes("gamemonetize")) return true;
  return url.startsWith("https://html5.gamedistribution.com/rvvASMiM/") && url.endsWith("/index.html");
}

export function isPlayableGame(game: Game): boolean {
  return isValidIframeUrl(game.iframe_url);
}

export function validateGame(game: Game): boolean {
  return isPlayableGame(game);
}
