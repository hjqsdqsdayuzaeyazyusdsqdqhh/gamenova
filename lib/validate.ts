import { Game } from "@/data/games";

export function isValidIframeUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("/api/gd/") && url.endsWith("/index.html")) return true;
  if (url.startsWith("https://") && url.includes("gamemonetize")) return true;
  return false;
}

export function isPlayableGame(game: Game): boolean {
  return isValidIframeUrl(game.iframe_url);
}

export function validateGame(game: Game): boolean {
  return isPlayableGame(game);
}
