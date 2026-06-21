import { Metadata } from "next";
import Link from "next/link";
import { games, categories } from "@/data/games";
import { isPlayableGame } from "@/lib/validate";
import GameCard from "@/components/GameCard";
import { notFound } from "next/navigation";

const validGames = games.filter(isPlayableGame);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found - GameNova" };
  return {
    title: `${cat.name} Games - Play Free Online | GameNova`,
    description: `Play the best free ${cat.name.toLowerCase()} browser games. Discover top ${cat.name.toLowerCase()} games online at GameNova.`,
    openGraph: {
      title: `${cat.name} Games - GameNova`,
      description: `Play the best free ${cat.name.toLowerCase()} browser games.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} Games - GameNova`,
      description: `Play the best free ${cat.name.toLowerCase()} browser games.`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const categoryGames = validGames
    .filter((g) => g.category.toLowerCase() === slug)
    .sort((a, b) => b.popularity_score - a.popularity_score);

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
          {cat.name} Games
        </h1>
        <p className="text-gray-400">
          {categoryGames.length} game{categoryGames.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {categoryGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">No games found in this category.</p>
        </div>
      )}
    </div>
  );
}
