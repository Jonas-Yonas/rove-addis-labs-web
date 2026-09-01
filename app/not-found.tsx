import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { BrandGlyph, DotGrid } from "@/components/public/decor";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <DotGrid className="mask-[radial-gradient(ellipse_50%_60%_at_50%_40%,black,transparent)]" />
      <BrandGlyph className="absolute top-1/2 left-1/2 -z-10 size-[32rem] -translate-x-1/2 -translate-y-1/2 text-accent/6" />

      <div className="mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
          Page not found
        </p>

        <p className="mt-6 text-7xl font-semibold tracking-tight sm:text-8xl">
          404
        </p>

        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <Home className="size-4" />
            Back home
          </Link>
          <Link
            href="/work"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-background px-6 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-muted"
          >
            <ArrowLeft className="size-4" />
            See our work
          </Link>
        </div>
      </div>
    </section>
  );
}
