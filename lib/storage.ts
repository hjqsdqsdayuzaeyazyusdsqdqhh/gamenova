const FAVORITES_KEY = "gamenova_favorites";
const RECENTLY_PLAYED_KEY = "gamenova_recently_played";

function getStorage(key: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setStorage(key: string, value: number[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export function getFavorites(): number[] {
  return getStorage(FAVORITES_KEY);
}

export function toggleFavorite(gameId: number): boolean {
  const favorites = getFavorites();
  const index = favorites.indexOf(gameId);
  if (index > -1) {
    favorites.splice(index, 1);
    setStorage(FAVORITES_KEY, favorites);
    return false;
  } else {
    favorites.push(gameId);
    setStorage(FAVORITES_KEY, favorites);
    return true;
  }
}

export function isFavorite(gameId: number): boolean {
  return getFavorites().includes(gameId);
}

export function getRecentlyPlayed(): number[] {
  return getStorage(RECENTLY_PLAYED_KEY);
}

export function addRecentlyPlayed(gameId: number): void {
  const played = getRecentlyPlayed();
  const index = played.indexOf(gameId);
  if (index > -1) played.splice(index, 1);
  played.unshift(gameId);
  if (played.length > 30) played.pop();
  setStorage(RECENTLY_PLAYED_KEY, played);
}
