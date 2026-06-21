import Link from "next/link";
import { Metadata } from "next";
import { games } from "@/data/games";
import { validateGame } from "@/lib/validate";
import GameCard from "@/components/GameCard";
import GameIframe from "@/components/GameIframe";
import FavoriteButton from "@/components/FavoriteButton";
import ShareButtons from "@/components/ShareButtons";
import GameTags from "@/components/GameTags";
import RecentlyPlayedTracker from "@/components/RecentlyPlayed";
import { notFound } from "next/navigation";

const validGames = games.filter(validateGame);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return { title: "Game Not Found - GameNova" };
  return {
    title: `${game.title} - Play Free Online Game | GameNova`,
    description: game.description,
    openGraph: {
      title: `${game.title} - GameNova`,
      description: game.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} - GameNova`,
      description: game.description,
    },
  };
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();

  const related = validGames
    .filter((g) => g.category === game.category && g.id !== game.id)
    .slice(0, 4);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <RecentlyPlayedTracker gameId={game.id} />

      <Link
        href="/games"
        className="text-accent hover:underline mb-6 inline-block text-sm"
      >
        &larr; Back to Games
      </Link>

      <div className="mb-6">
        <GameIframe url={game.iframe_url} title={game.title} />
      </div>

      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <Link
              href={`/category/${game.category.toLowerCase()}`}
              className="inline-block bg-accent/20 text-accent text-xs px-3 py-1 rounded-full hover:bg-accent/30 transition font-medium"
            >
              {game.category}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">
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

        <p className="text-gray-400 text-base max-w-3xl leading-relaxed mb-6">
          {game.description}
        </p>

        <GameTags tags={game.tags} />
      </div>

      {related.length > 0 && (
        <section className="mt-12">
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
