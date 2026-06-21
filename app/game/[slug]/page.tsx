import { Metadata } from "next";
import { games } from "@/data/games";
import { validateGame } from "@/lib/validate";
import GamePageClient from "@/components/GamePageClient";
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

  return <GamePageClient game={game} related={related} />;
}
