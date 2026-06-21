# GameNova

A professional browser games portal built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 200 games across 7 categories
- Full-screen iframe game player with lazy loading
- Favorites system (localStorage)
- Recently played tracking
- Fuzzy search with dedicated /search page
- Category filtering with sort options (Popular, Newest)
- Featured, Trending, New, Most Played, and Recently Played sections
- Horizontal trending slider (drag to scroll)
- Floating particles background
- Popularity score badges
- Framer Motion animations throughout
- Glassmorphism dark UI with neon accents
- Twitter Card metadata for social sharing
- Dynamic SEO for every page
- Sitemap.xml and robots.txt
- Fully responsive

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy

Deploy to Vercel with zero configuration.

## Project Structure

```
app/              # Next.js App Router pages
  page.tsx        # Homepage with animated hero, sliders
  games/          # Game directory with sort/filter
  game/[slug]/    # Individual game pages
  category/[slug]/ # Category pages sorted by popularity
  search/         # Fuzzy search results page
  sitemap.xml/    # Dynamic sitemap
  robots.txt/     # Dynamic robots.txt
components/       # Reusable UI components
  ParticlesBackground  # Canvas floating particles
  TrendingSlider       # Framer Motion horizontal slider
  RecentlyPlayedSection # Recently played grid
  GameCard             # Card with motion hover + popularity badge
  GameIframe           # Lazy-loaded iframe player
data/             # Game data (200 games with popularity_score)
lib/              # Client-side storage utilities
public/           # Static assets
```
