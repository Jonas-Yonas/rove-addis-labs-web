import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>

      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-64" />
          <Skeleton className="mt-6 h-24 w-full max-w-md" />
        </div>
      ))}
    </div>
  );
}
