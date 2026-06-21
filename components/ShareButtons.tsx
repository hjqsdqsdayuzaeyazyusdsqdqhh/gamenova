"use client";

interface Props {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: Props) {
  const url = typeof window !== "undefined"
    ? `${window.location.origin}/game/${slug}`
    : `https://gamenova.vercel.app/game/${slug}`;

  const shareData = { title, text: `Play ${title} on GameNova`, url };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const shareLinks = [
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Play ${title} on GameNova`)}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-sky-500/20 hover:text-sky-400",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-500/20 hover:text-blue-400",
    },
    {
      name: "Copy",
      onClick: handleShare,
      color: "hover:bg-accent/20 hover:text-accent",
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 mr-1">Share</span>
      {shareLinks.map((link) =>
        link.href ? (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 rounded-full glass flex items-center justify-center transition ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            <span className="text-xs font-medium">{link.name === "Twitter" ? "X" : link.name === "Facebook" ? "F" : ""}</span>
          </a>
        ) : (
          <button
            key={link.name}
            onClick={link.onClick}
            className={`w-8 h-8 rounded-full glass flex items-center justify-center transition ${link.color}`}
            aria-label={link.name}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        )
      )}
    </div>
  );
}
