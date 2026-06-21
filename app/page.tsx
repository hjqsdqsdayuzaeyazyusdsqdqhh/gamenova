import Link from "next/link";
import GameCard from "@/components/GameCard";
import TrendingSlider from "@/components/TrendingSlider";
import RecentlyPlayedSection from "@/components/RecentlyPlayedSection";
import { games, categories } from "@/data/games";

export default function Home() {
  const featuredGames = games.filter((g) => g.featured);
  const trendingGames = [...games].filter((g) => g.trending).sort((a, b) => b.popularity_score - a.popularity_score);
  const newGames = [...games].sort((a, b) => b.id - a.id).slice(0, 8);
  const popularGames = [...games].sort((a, b) => b.popularity_score - a.popularity_score).slice(0, 8);

  return (
    <div>
      <section className="relative py-28 px-4 text-center overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: "3s" }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up leading-tight">
            Play <span className="text-accent text-glow">Free</span> Browser
            Games
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Discover hundreds of free browser games across every genre.
            No downloads, no hassle &mdash; just instant fun.
          </p>
          <form
            action="/search"
            method="GET"
            className="relative max-w-md mx-auto animate-fade-in-up"
          >
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search 200+ games..."
                className="w-full px-4 py-3.5 pl-11 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-accent/50 transition"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
          <div className="flex items-center justify-center gap-4 mt-8 animate-fade-in-up">
            <Link
              href="/games"
              className="bg-accent text-dark font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition shadow-lg shadow-accent/20"
            >
              Browse All Games
            </Link>
            <Link
              href="/games?sort=popularity"
              className="glass text-gray-200 font-semibold px-8 py-3 rounded-xl hover:bg-accent/10 hover:text-accent transition"
            >
              Popular Games
            </Link>
          </div>
        </div>
      </section>

      <TrendingSlider games={trendingGames} />

      {featuredGames.length > 0 && (
        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Featured Games</h2>
              <p className="text-gray-500 text-sm mt-1">Hand-picked top games</p>
            </div>
            <Link href="/games" className="text-accent hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>
      )}

      <RecentlyPlayedSection />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">New Games</h2>
            <p className="text-gray-500 text-sm mt-1">Latest additions to GameNova</p>
          </div>
          <Link href="/games?sort=newest" className="text-accent hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {newGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Categories</h2>
            <p className="text-gray-500 text-sm mt-1">Browse by genre</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const count = games.filter(
              (g) => g.category.toLowerCase() === cat.slug
            ).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="glass glass-hover rounded-xl p-5 text-center transition group"
              >
                <span className="text-white font-semibold group-hover:text-accent transition block text-sm">
                  {cat.name}
                </span>
                <span className="text-gray-500 text-xs mt-1 block">
                  {count} games
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Most Played</h2>
            <p className="text-gray-500 text-sm mt-1">Community favorites</p>
          </div>
          <Link href="/games" className="text-accent hover:underline text-sm">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}
