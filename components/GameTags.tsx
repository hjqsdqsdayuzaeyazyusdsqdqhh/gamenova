import Link from "next/link";

interface Props {
  tags: string[];
}

export default function GameTags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/games?search=${encodeURIComponent(tag)}`}
          className="text-xs px-3 py-1 rounded-full glass text-gray-400 hover:text-accent hover:border-accent/30 transition"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
