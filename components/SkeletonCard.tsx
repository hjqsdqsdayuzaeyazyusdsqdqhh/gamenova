export default function SkeletonCard() {
  return (
    <div className="glass rounded-xl overflow-hidden animate-pulse">
      <div className="h-44 bg-white/5" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-white/5 rounded-full" />
        <div className="h-4 w-3/4 bg-white/5 rounded" />
      </div>
    </div>
  );
}
