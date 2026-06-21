"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Game } from "@/data/games";
import { isFavorite, toggleFavorite } from "@/lib/storage";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(game.id));
  }, [game.id]);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleFavorite(game.id);
    setFav(result);
  };

  return (
    <Link
      href={`/game/${game.slug}`}
      className="group relative block glass glass-hover rounded-xl overflow-hidden"
    >
      {(game.featured || game.trending) && (
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {game.featured && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent text-dark px-2 py-0.5 rounded">
              Featured
            </span>
          )}
          {game.trending && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent-purple text-white px-2 py-0.5 rounded">
              Trending
            </span>
          )}
        </div>
      )}

      <button
        onClick={handleFav}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-accent/20 transition"
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      >
        <svg
          className={`w-4 h-4 ${fav ? "text-red-400 fill-red-400" : "text-white"}`}
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
      </button>

      <div
        className={`h-44 bg-gradient-to-br ${game.thumbnail} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
        <span className="text-2xl font-bold text-white/20 select-none group-hover:scale-110 transition-transform duration-300">
          {game.title}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center shadow-lg shadow-accent/20">
            <svg className="w-6 h-6 text-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
            {game.category}
          </span>
        </div>
        <h3 className="text-white font-semibold group-hover:text-accent transition-colors text-sm">
          {game.title}
        </h3>
      </div>
    </Link>
  );
}
