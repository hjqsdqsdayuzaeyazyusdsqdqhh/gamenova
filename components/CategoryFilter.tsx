"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: string[];
}

export default function CategoryFilter({ categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("category") || "";

  const handleClick = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat.toLowerCase() === active) {
      params.delete("category");
    } else {
      params.set("category", cat.toLowerCase());
    }
    router.push(`/games?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete("category");
          router.push(`/games?${params.toString()}`);
        }}
        className={`px-4 py-2 rounded-xl transition text-sm ${
          !active
            ? "bg-accent text-dark font-semibold"
            : "glass text-gray-300 hover:text-accent"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-xl transition text-sm ${
            cat.toLowerCase() === active
              ? "bg-accent text-dark font-semibold"
              : "glass text-gray-300 hover:text-accent"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
