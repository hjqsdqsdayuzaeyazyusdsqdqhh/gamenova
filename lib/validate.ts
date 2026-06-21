import { Game } from "@/data/games";

export function isValidIframeUrl(url: string): boolean {
  if (!url || !url.startsWith("https://")) return false;
  return url.includes("gamedistribution") || url.includes("gamemonetize");
}

export function isPlayableGame(game: Game): boolean {
  if (!isValidIframeUrl(game.iframe_url)) return false;
  if (!game.iframe_url.startsWith("https://html5")) return false;
  return true;
}

export function validateGame(game: Game): boolean {
  return isPlayableGame(game);
}
