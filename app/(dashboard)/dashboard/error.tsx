"use client";

import { AlertCircle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-muted">
          <AlertCircle className="size-6 text-muted-foreground" />
        </div>

        <h2 className="mt-4 text-lg font-semibold">
          We couldn&apos;t load your dashboard
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading your workspace. Please try again.
        </p>

        <Button className="mt-5" onClick={() => reset()}>
          <RefreshCw className="size-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}
