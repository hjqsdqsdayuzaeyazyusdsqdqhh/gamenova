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
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 512 512" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="navCtrl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00d4ff"/>
                <stop offset="100%" stop-color="#8b5cf6"/>
              </linearGradient>
              <linearGradient id="navPlay" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#a5b4fc"/>
              </linearGradient>
              <filter id="navGlow">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <rect x="40" y="40" width="432" height="432" rx="80" fill="#0b0b1a"/>
            <g filter="url(#navGlow)">
              <path d="M 180 200 C 180 175, 220 160, 256 160 C 292 160, 332 175, 332 200 L 340 210 C 350 225, 355 245, 355 260 L 355 280 C 355 310, 340 335, 320 350 L 305 360 C 295 368, 280 365, 275 355 L 270 340 C 267 330, 262 320, 256 320 C 250 320, 245 330, 242 340 L 237 355 C 232 365, 217 368, 207 360 L 192 350 C 172 335, 157 310, 157 280 L 157 260 C 157 245, 162 225, 172 210 Z" fill="url(#navCtrl)" stroke="url(#navCtrl)" stroke-width="6"/>
            </g>
            <path d="M 190 205 C 190 185, 224 172, 256 172 C 288 172, 322 185, 322 205 L 329 214 C 337 226, 342 244, 342 258 L 342 278 C 342 304, 329 326, 312 339 L 300 347 C 293 352, 283 350, 279 343 L 275 330 C 272 322, 268 314, 256 314 C 244 314, 240 322, 237 330 L 233 343 C 229 350, 219 352, 212 347 L 200 339 C 183 326, 170 304, 170 278 L 170 258 C 170 244, 175 226, 183 214 Z" fill="#0b0b1a" fill-opacity="0.6"/>
            <g filter="url(#navGlow)">
              <polygon points="236,240 236,272 264,256" fill="url(#navPlay)" stroke="#ffffff" stroke-width="3" opacity="0.95"/>
            </g>
          </svg>
          <span className="text-2xl font-bold text-white">
            Game<span className="text-accent">Nova</span>
          </span>
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
