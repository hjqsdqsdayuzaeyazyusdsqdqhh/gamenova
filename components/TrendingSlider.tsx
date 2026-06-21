"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Game } from "@/data/games";

interface Props {
  games: Game[];
}

export default function TrendingSlider({ games }: Props) {
  if (games.length === 0) return null;

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
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.3 }}
            className="min-w-[240px]"
          >
            <Link href={`/game/${game.slug}`} className="block group">
                <div
                  className={`h-36 bg-gradient-to-br ${game.thumbnail} rounded-xl relative overflow-hidden`}
                >
                  {game.image_url && (
                    <img src={game.image_url} alt={game.title} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-accent/90 flex items-center justify-center">
                    <svg className="w-5 h-5 text-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-0.5 rounded-full">
                  {game.category}
                </span>
                <h3 className="text-white font-semibold text-sm mt-1 group-hover:text-accent transition-colors">
                  {game.title}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
