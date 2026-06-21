"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { games } from "@/data/games";
import { isPlayableGame } from "@/lib/validate";
import GameCard from "@/components/GameCard";

const validGames = games.filter(isPlayableGame);

function fuzzyScore(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 80;
  if (lowerText.includes(lowerQuery)) return 50;

  let score = 0;
  let qi = 0;
  for (let ti = 0; ti < lowerText.length && qi < lowerQuery.length; ti++) {
    if (lowerText[ti] === lowerQuery[qi]) {
      score += 10;
      qi++;
    }
  }
  return qi === lowerQuery.length ? score : 0;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim();

    const scored = validGames
      .map((game) => {
        let bestScore = 0;
        bestScore = Math.max(bestScore, fuzzyScore(game.title, q));
        bestScore = Math.max(bestScore, fuzzyScore(game.description, q) * 0.6);
        bestScore = Math.max(
          bestScore,
          Math.max(...game.tags.map((t) => fuzzyScore(t, q))) * 0.7
        );
        bestScore = Math.max(
          bestScore,
          fuzzyScore(game.category, q) * 0.4
        );
        return { game, score: bestScore };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.map((item) => item.game);
  }, [query]);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <Link
        href="/games"
        className="text-accent hover:underline mb-6 inline-block text-sm"
      >
        &larr; All Games
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Search Results
        </h1>
        {query && (
          <p className="text-gray-400">
            {results.length} result{results.length !== 1 ? "s" : ""} for
            &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {!query.trim() ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-2">Enter a search term</p>
          <p className="text-gray-600 text-sm">
            Try searching for a game title, category, or keyword
          </p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-2">No games found</p>
          <p className="text-gray-600 text-sm">
            Try a different search term
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-gray-400">Loading...</div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
