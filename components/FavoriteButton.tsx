"use client";

import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "@/lib/storage";

interface Props {
  gameId: number;
}

export default function FavoriteButton({ gameId }: Props) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(gameId));
  }, [gameId]);

  const handleClick = () => {
    const result = toggleFavorite(gameId);
    setFav(result);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl transition text-sm ${
        fav
          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
          : "glass text-gray-300 hover:text-accent"
      }`}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
    >
      <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill={fav ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {fav ? "Favorited" : "Favorite"}
    </button>
  );
}
