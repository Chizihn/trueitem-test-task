export default function TaskSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900 animate-pulse"
        >
          {/* Checkbox skeleton */}
          <div className="w-5 h-5 rounded-full bg-neutral-700 flex-shrink-0" />

          {/* Title skeleton */}
          <div
            className="h-4 bg-neutral-700 rounded"
            style={{ width: `${50 + Math.random() * 30}%` }}
          />
        </div>
      ))}
    </div>
  );
}
