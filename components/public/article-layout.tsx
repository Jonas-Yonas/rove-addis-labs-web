import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ArticleLayout({
  backHref,
  backLabel,
  section,
  meta,
  aside,
  title,
  lead,
  coverUrl,
  children,
}: {
  backHref: string;
  backLabel: string;
  /** Small label shown at the top of the side rail, e.g. "Insights". */
  section: string;
  /** Inline pills / date shown above the title. */
  meta?: ReactNode;
  /** Extra rows for the side rail (date, status, links). */
  aside?: ReactNode;
  title: string;
  lead?: string | null;
  coverUrl?: string | null;
  children: ReactNode;
}) {
  return (
    <article className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-90 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(40,181,177,0.09),transparent)]"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>

        <div className="mt-8 gap-16 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            {meta && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                {meta}
              </div>
            )}

            <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-[2.75rem] sm:leading-[1.1]">
              {title}
            </h1>

            {lead && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                {lead}
              </p>
            )}

            {coverUrl && (
              <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border bg-muted">
                <Image
                  src={coverUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  unoptimized
                />
              </div>
            )}

            <div className="mt-12">{children}</div>
          </div>

          <aside className="mt-12 border-t pt-6 lg:mt-0 lg:border-t-0 lg:pt-0">
            <div className="space-y-6 text-sm lg:sticky lg:top-24">
              <div>
                <p className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  {section}
                </p>
                {aside && (
                  <div className="mt-3 space-y-1.5 text-muted-foreground">
                    {aside}
                  </div>
                )}
              </div>

              <div className="border-t pt-6">
                <p className="text-muted-foreground">Have a project in mind?</p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-foreground"
                >
                  Let&apos;s talk
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

export function MetaDot() {
  return (
    <span aria-hidden="true" className="text-border">
      •
    </span>
  );
}

export function StatusPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-accent uppercase">
      {children}
    </span>
  );
}
