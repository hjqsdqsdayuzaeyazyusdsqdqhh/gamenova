"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { games, Game } from "@/data/games";
import { getRecentlyPlayed } from "@/lib/storage";

export default function RecentlyPlayedSection() {
  const [recentGames, setRecentGames] = useState<Game[]>([]);

  useEffect(() => {
    const ids = getRecentlyPlayed();
    const found = ids
      .map((id) => games.find((g) => g.id === id))
      .filter((g): g is Game => g !== undefined)
      .slice(0, 8);
    setRecentGames(found);
  }, []);

  if (recentGames.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-white">Recently Played</h2>
        </div>
        <p className="text-gray-500 text-sm mt-1">Pick up where you left off</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {recentGames.map((game) => (
          <Link
            key={game.id}
            href={`/game/${game.slug}`}
            className="group text-center"
          >
            <div
              className={`h-24 bg-gradient-to-br ${game.thumbnail} rounded-xl relative overflow-hidden`}
            >
              {game.image_url && (
                <img src={game.image_url} alt={game.title} className="absolute inset-0 w-full h-full object-cover" />
              )}
              {!game.image_url && (
                <div className="flex items-center justify-center h-full">
                  <svg className="w-6 h-6 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center">
                  <svg className="w-4 h-4 text-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-300 mt-2 truncate group-hover:text-accent transition-colors">
              {game.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
