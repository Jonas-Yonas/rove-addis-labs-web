"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border p-8 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We couldn&apos;t load the Labs workspace. Please try again.
      </p>
      <Button className="mt-5" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
