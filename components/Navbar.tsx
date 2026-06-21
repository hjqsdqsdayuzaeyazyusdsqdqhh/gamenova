"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/games";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="sticky top-0 z-50">
      <div className="absolute inset-0 bg-dark/70 backdrop-blur-xl border-b border-white/5" />
      <div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Game<span className="text-accent">Nova</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-gray-300 hover:text-accent transition text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/games"
            className="text-gray-300 hover:text-accent transition text-sm font-medium"
          >
            Browse
          </Link>
          <Link
            href="/search"
            className="text-gray-300 hover:text-accent transition text-sm font-medium"
          >
            Search
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <button className="text-gray-300 hover:text-accent transition text-sm font-medium flex items-center gap-1">
              Categories
              <svg
                className={`w-3 h-3 transition-transform ${showCategories ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence>
              {showCategories && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-3 glass rounded-xl shadow-2xl py-2 w-44"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2.5 text-sm text-gray-300 hover:text-accent hover:bg-accent/5 transition"
                      onClick={() => setShowCategories(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 relative z-10"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 px-4 overflow-hidden"
          >
            <div className="py-4 space-y-1">
              <Link
                href="/"
                className="block text-gray-300 hover:text-accent transition py-2.5 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/games"
                className="block text-gray-300 hover:text-accent transition py-2.5 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Browse
              </Link>
              <Link
                href="/search"
                className="block text-gray-300 hover:text-accent transition py-2.5 text-sm"
                onClick={() => setIsOpen(false)}
              >
                Search
              </Link>
              <div className="pt-3 mt-3 border-t border-white/5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">
                  Categories
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block text-gray-300 hover:text-accent transition py-2 px-2 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
