import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>

      <Skeleton className="h-10 w-full sm:max-w-xs" />

      <div className="overflow-hidden rounded-xl border">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b p-4 last:border-b-0"
          >
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-7 w-28" />
          </div>
        ))}
      </div>
    </div>
  );
}
