import Link from "next/link";
import { ArrowRight } from "lucide-react";

const insights = [
  {
    category: "Engineering",
    title: "Building software for real-world problems",
  },
  {
    category: "AI",
    title: "Where intelligent systems can create practical value",
  },
  {
    category: "Product",
    title: "From local ideas to products built for scale",
  },
];

export function InsightsSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
              Insights
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Ideas worth sharing.
            </h2>
          </div>

          <Link
            href="/blog"
            className="hidden items-center gap-2 text-sm font-medium sm:inline-flex"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {insights.map((insight) => (
            <Link
              key={insight.title}
              href="/blog"
              className="group rounded-xl border border-border p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
            >
              <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">
                {insight.category}
              </p>

              <h3 className="mt-6 text-xl font-semibold leading-7 transition-colors group-hover:text-accent">
                {insight.title}
              </h3>

              <span className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground">
                Read more
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium sm:hidden"
        >
          View all insights
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
