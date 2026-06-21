"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { games, categories } from "@/data/games";
import GameCard from "@/components/GameCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";

function GamesContent() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";

  const filtered = useMemo(() => {
    let result = [...games];

    if (currentCategory) {
      result = result.filter(
        (g) => g.category.toLowerCase() === currentCategory.toLowerCase()
      );
    }

    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [currentSearch, currentCategory]);

  const allCategories = categories.map((c) => c.name);

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            {currentCategory
              ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Games`
              : "All Games"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {filtered.length} game{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {currentCategory && (
        <div className="mb-6">
          <Link href="/games" className="text-accent hover:underline text-sm">
            &larr; Clear filter
          </Link>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar />
        <CategoryFilter categories={allCategories} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg mb-2">No games found</p>
          <p className="text-gray-600 text-sm">
            Try a different search term or category
          </p>
        </div>
      )}
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-gray-400">Loading games...</div>
      }
    >
      <GamesContent />
    </Suspense>
  );
}
