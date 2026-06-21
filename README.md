# GameNova

A professional browser games portal built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 100 games across 7 categories
- Full-screen iframe game player
- Favorites system (localStorage)
- Recently played tracking
- Search by title and tags
- Category filtering
- Featured, Trending, New, and Popular sections
- Glassmorphism dark UI
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
  page.tsx        # Homepage
  games/          # Games directory
  game/[slug]/    # Individual game pages
  category/[slug]/ # Category pages
  sitemap.xml/    # Dynamic sitemap
  robots.txt/     # Dynamic robots.txt
components/       # Reusable UI components
data/             # Game data (100 games)
lib/              # Client-side storage utilities
public/           # Static assets
```
