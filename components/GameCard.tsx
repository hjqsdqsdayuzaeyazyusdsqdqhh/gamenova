"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Game } from "@/data/games";
import { isFavorite, toggleFavorite } from "@/lib/storage";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props) {
  const [fav, setFav] = useState(false);
  const [imgError, setImgError] = useState(false);

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
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/game/${game.slug}`}
        className="group relative block glass glass-hover rounded-xl overflow-hidden"
      >
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

        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <div className="flex items-center gap-1 bg-dark/60 backdrop-blur-sm text-accent text-[10px] font-bold px-2 py-0.5 rounded">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {game.popularity_score}
          </div>
        </div>

        <button
          onClick={handleFav}
          className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-accent/20 transition"
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
          {game.image_url && !imgError && (
            <img
              src={game.image_url}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
          {(!game.image_url || imgError) && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white/30 select-none">{game.title}</span>
            </div>
          )}
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
    </motion.div>
  );
}
