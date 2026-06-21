"use client";

import { useState } from "react";
import Link from "next/link";
import { Game } from "@/data/games";
import { isPlayableGame } from "@/lib/validate";
import GameIframe from "@/components/GameIframe";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButtons from "@/components/ShareButtons";
import GameTags from "@/components/GameTags";
import RecentlyPlayedTracker from "@/components/RecentlyPlayed";
import GameCard from "@/components/GameCard";

interface Props {
  game: Game;
  related: Game[];
}

export default function GamePageClient({ game, related }: Props) {
  const [play, setPlay] = useState(false);

  const isValid = isPlayableGame(game);

  return (
    <div className="min-h-screen bg-[#0b0b1a]">
      <RecentlyPlayedTracker gameId={game.id} />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          href="/games"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-accent transition text-sm mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Games
        </Link>
      </div>

      {!play ? (
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="max-w-4xl mx-auto">
            <div
              className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${game.thumbnail} relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <Link
                  href={`/category/${game.category.toLowerCase()}`}
                  className="inline-block bg-accent/20 text-accent text-xs px-3 py-1 rounded-full hover:bg-accent/30 transition font-medium mb-3"
                >
                  {game.category}
                </Link>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {game.title}
                </h1>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                  {game.description}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 bg-accent/10 text-accent text-sm font-semibold px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {game.popularity_score}
                  </div>
                  <GameTags tags={game.tags} />
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ShareButtons title={game.title} slug={game.slug} />
                <FavoriteButton gameId={game.id} />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setPlay(true)}
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-dark font-bold text-lg px-10 py-4 rounded-xl transition-all shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-105 active:scale-95"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-black">
          {isValid ? (
            <GameIframe url={game.iframe_url} title={game.title} />
          ) : (
            <div className="w-full min-h-[700px] bg-black flex items-center justify-center">
              <div className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <p className="text-gray-400 font-semibold">Game not available</p>
                <p className="text-gray-600 text-sm mt-1">Invalid or missing game source</p>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <Link
                    href={`/category/${game.category.toLowerCase()}`}
                    className="inline-block bg-accent/20 text-accent text-xs px-3 py-1 rounded-full hover:bg-accent/30 transition font-medium"
                  >
                    {game.category}
                  </Link>
                  <h1 className="text-2xl md:text-3xl font-bold text-white mt-3">
                    {game.title}
                  </h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-accent/10 text-accent text-sm font-semibold px-3 py-1.5 rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {game.popularity_score}
                  </div>
                  <ShareButtons title={game.title} slug={game.slug} />
                  <FavoriteButton gameId={game.id} />
                </div>
              </div>
              <p className="text-gray-400 text-base max-w-3xl leading-relaxed mb-4">
                {game.description}
              </p>
              <GameTags tags={game.tags} />
            </div>
          </div>
        </div>
      )}

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">
              More {game.category} Games
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              You might also enjoy these games
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
