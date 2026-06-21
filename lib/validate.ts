import { Game } from "@/data/games";

export function isValidIframeUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("/api/gd/") && url.endsWith("/index.html")) return true;
  if (url.startsWith("https://") && url.includes("gamemonetize")) return true;
  return false;
}

export function isApprovedGame(game: Game): boolean {
  if (!game.iframe_url) return false;
  if (game.status !== "verified") return false;
  if (game.playable !== true) return false;
  if (!game.iframe_url.startsWith("/api/gd/") && !game.iframe_url.startsWith("https://")) return false;
  return true;
}

export function isPlayableGame(game: Game): boolean {
  return isApprovedGame(game);
}

export function validateGame(game: Game): boolean {
  return isApprovedGame(game);
}
