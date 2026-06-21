"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { games, Game } from "@/data/games";
import { getRecentlyPlayed } from "@/lib/storage";

const FALLBACK_IMG = "https://via.placeholder.com/200x120/1a1a2e/ffffff?text=Game";

export default function RecentlyPlayedSection() {
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const ids = getRecentlyPlayed();
    const found = ids
      .map((id) => games.find((g) => g.id === id))
      .filter((g): g is Game => g !== undefined)
      .slice(0, 8);
    setRecentGames(found);
  }, []);

  if (recentGames.length === 0) return null;

  const handleImgError = (id: number) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

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
        {recentGames.map((game) => {
          const imageSrc = game.image_url && !imgErrors[game.id]
            ? game.image_url
            : `${FALLBACK_IMG}?text=${encodeURIComponent(game.title)}`;

          return (
            <Link
              key={game.id}
              href={`/game/${game.slug}`}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
                <img
                  src={imageSrc}
                  alt={game.title}
                  className="w-full h-24 object-cover block opacity-100 rounded-xl"
                  onError={() => handleImgError(game.id)}
                />
              </div>
              <p className="text-xs text-gray-300 mt-2 truncate group-hover:text-accent transition-colors">
                {game.title}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
