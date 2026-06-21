"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Game } from "@/data/games";
import { isFavorite, toggleFavorite } from "@/lib/storage";

interface Props {
  game: Game;
}

const FALLBACK_IMG = "https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Game";

export default function GameCard({ game }: Props) {
  const [fav, setFav] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setFav(isFavorite(game.id));
  }, [game.id]);

  useEffect(() => {
    if (game.image_url) {
      console.log(`[GameCard] "${game.title}" image: ${game.image_url}`);
    } else {
      console.log(`[GameCard] "${game.title}" has no image_url, using placeholder`);
    }
  }, [game.image_url, game.title]);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleFavorite(game.id);
    setFav(result);
  };

  const imageSrc = game.image_url && !imgError
    ? game.image_url
    : `${FALLBACK_IMG}?text=${encodeURIComponent(game.title)}`;

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

        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-dark/60 backdrop-blur-sm text-accent text-[10px] font-bold px-2 py-0.5 rounded">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {game.popularity_score}
        </div>

        <div className="relative overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-800 to-gray-900">
          <img
            src={imageSrc}
            alt={game.title}
            className="w-full h-[180px] object-cover block opacity-100 rounded-t-xl"
            onError={() => setImgError(true)}
          />
        </div>

        <div className="p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
              {game.category}
            </span>
            <h3 className="text-white font-semibold group-hover:text-accent transition-colors text-sm mt-1 truncate">
              {game.title}
            </h3>
          </div>
          <div className="shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors duration-200">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <button
          onClick={handleFav}
          className="absolute top-3 right-12 z-10 w-7 h-7 rounded-full bg-dark/50 backdrop-blur-sm flex items-center justify-center hover:bg-accent/30 transition opacity-0 group-hover:opacity-100"
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className={`w-3.5 h-3.5 ${fav ? "text-red-400 fill-red-400" : "text-white"}`}
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
      </Link>
    </motion.div>
  );
}
