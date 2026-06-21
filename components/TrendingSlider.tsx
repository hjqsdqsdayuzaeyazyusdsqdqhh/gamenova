"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Game } from "@/data/games";

interface Props {
  games: Game[];
}

const FALLBACK_IMG = "https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Game";

export default function TrendingSlider({ games }: Props) {
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  if (games.length === 0) return null;

  const handleImgError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Trending Games</h2>
          <p className="text-gray-500 text-sm mt-1">Most popular right now</p>
        </div>
        <Link
          href="/games?sort=popularity"
          className="text-accent hover:underline text-sm"
        >
          View All
        </Link>
      </div>

      <motion.div
        className="flex gap-4 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: -((games.length * 260) - 1000), right: 0 }}
        dragElastic={0.1}
      >
        {games.map((game, i) => {
          const imageSrc = game.image_url && !imgErrors[game.id]
            ? game.image_url
            : `${FALLBACK_IMG}?text=${encodeURIComponent(game.title)}`;

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="min-w-[240px]"
            >
              <Link href={`/game/${game.slug}`} className="block group">
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                  <img
                    src={imageSrc}
                    alt={game.title}
                    className="w-full h-[180px] object-cover block opacity-100 rounded-xl"
                    onError={() => handleImgError(game.id)}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                      {game.category}
                    </span>
                    <h3 className="text-white font-semibold text-sm mt-1 group-hover:text-accent transition-colors truncate">
                      {game.title}
                    </h3>
                  </div>
                  <div className="shrink-0 w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent transition-colors duration-200">
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
