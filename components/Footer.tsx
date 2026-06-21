import Link from "next/link";
import { categories } from "@/data/games";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              Game<span className="text-accent">Nova</span>
            </Link>
            <p className="text-gray-500 text-sm mt-2 max-w-xs leading-relaxed">
              The best free browser games. Play instantly, no downloads required.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-accent transition text-sm">
                Home
              </Link>
              <Link href="/games" className="block text-gray-400 hover:text-accent transition text-sm">
                All Games
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block text-gray-400 hover:text-accent transition text-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">&nbsp;</h3>
            <div className="space-y-2">
              {categories.slice(4).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block text-gray-400 hover:text-accent transition text-sm"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 text-xs mt-10 pt-6 border-t border-white/5">
          &copy; {new Date().getFullYear()} GameNova. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
