"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { games, categories } from "@/data/games";
import { validateGame } from "@/lib/validate";
import GameCard from "@/components/GameCard";
import SkeletonCard from "@/components/SkeletonCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";

const validGames = games.filter(validateGame);

if (typeof window !== "undefined") {
  const invalid = games.filter((g) => !validateGame(g));
  if (invalid.length > 0) {
    console.warn(`[GameNova] ${invalid.length} invalid game(s) blocked:`, invalid.map((g) => g.title));
  }
}

function GamesContent() {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "";

  const filtered = useMemo(() => {
    let result = [...validGames];

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

    if (currentSort === "popularity") {
      result.sort((a, b) => b.popularity_score - a.popularity_score);
    } else if (currentSort === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [currentSearch, currentCategory, currentSort]);

  const allCategories = categories.map((c) => c.name);

  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Most Popular", value: "popularity" },
    { label: "Newest", value: "newest" },
  ];

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
        <div className="flex gap-2">
          {sortOptions.map((opt) => (
            <Link
              key={opt.value}
              href={`/games${opt.value ? `?sort=${opt.value}` : ""}`}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition ${
                currentSort === opt.value
                  ? "bg-accent text-dark"
                  : "glass text-gray-300 hover:text-accent"
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02, duration: 0.2 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>
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
        <div className="py-12 px-4 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-10 w-48 bg-white/5 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <GamesContent />
    </Suspense>
  );
}
