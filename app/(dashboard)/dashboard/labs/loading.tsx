import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-5 w-full max-w-lg" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-xl border p-5">
            <div className="flex justify-between">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="mt-5 h-5 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
