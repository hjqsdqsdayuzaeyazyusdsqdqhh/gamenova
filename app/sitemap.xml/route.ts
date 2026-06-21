import { games, categories } from "@/data/games";
import { validateGame } from "@/lib/validate";

const BASE = "https://gamenova.vercel.app";
const validGames = games.filter(validateGame);

export async function GET() {
  const staticPages = [
    { url: "/", priority: "1.0" },
    { url: "/games", priority: "0.9" },
    { url: "/search", priority: "0.6" },
  ];

  const gamePages = validGames.map((g) => ({
    url: `/game/${g.slug}`,
    priority: "0.8",
  }));

  const categoryPages = categories.map((c) => ({
    url: `/category/${c.slug}`,
    priority: "0.7",
  }));

  const allPages = [...staticPages, ...gamePages, ...categoryPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((p) => `  <url>
    <loc>${BASE}${p.url}</loc>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
