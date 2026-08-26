import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full min-w-0 space-y-8" aria-label="Loading dashboard">
      <div className="space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-72 max-w-full" />
        <Skeleton className="h-5 w-lg max-w-full" />
      </div>

      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>

      <section className="grid gap-4 sm:grid-cols-2">
        {[1, 2].map((item) => (
          <div key={item} className="rounded-xl border bg-card p-5 shadow-sm">
            <Skeleton className="size-10 rounded-lg" />
            <div className="mt-5 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-14" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="space-y-2 border-b p-5 sm:p-6">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-56 max-w-full" />
        </div>

        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="size-9 shrink-0 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40 max-w-[45vw]" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="hidden h-3 w-20 sm:block" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
