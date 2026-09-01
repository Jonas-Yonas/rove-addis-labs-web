import Link from "next/link";
import { ArrowRight, Bot, Cloud, LayoutGrid } from "lucide-react";

import { BrandGlyph, DotGrid } from "@/components/public/decor";
import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";
import { getPublicCounts } from "@/lib/public/queries";

const chips = [
  { icon: Cloud, label: "SaaS Platforms", pos: "-left-3 top-10 sm:-left-6" },
  { icon: Bot, label: "AI & Automation", pos: "-right-3 top-1/2 sm:-right-8" },
  { icon: LayoutGrid, label: "Digital Products", pos: "bottom-8 left-6" },
];

export async function HeroSection() {
  const counts = await getPublicCounts();

  const stats = [
    counts.products > 0 && {
      value: `${counts.products}`,
      label: "Products & platforms",
    },
    counts.projects > 0 && {
      value: `${counts.projects}`,
      label: "Projects delivered",
    },
    counts.experiments > 0 && {
      value: `${counts.experiments}`,
      label: "In the lab",
    },
    { value: "Addis Ababa", label: "Built where it's needed" },
  ].filter(Boolean) as { value: string; label: string }[];

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <DotGrid className="mask-[radial-gradient(ellipse_50%_60%_at_8%_0%,black,transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_0%,rgba(40,181,177,0.13),transparent_46%)]" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              <span className="h-px w-8 bg-accent" />
              Building what matters
            </div>

            <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.02]">
              We build software that{" "}
              <span className="text-accent">moves ideas forward.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              {brand.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/work"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                Explore our work
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-muted"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl border bg-linear-to-br from-accent/12 via-card to-card shadow-sm">
              <DotGrid className="text-accent/25" />
              <BrandGlyph className="absolute top-1/2 left-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 text-accent/15" />
              <div className="absolute -right-6 -top-6 size-32 rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 size-36 rounded-full bg-accent/10 blur-3xl" />

              {/* stylized product surface */}
              <div className="absolute inset-x-6 bottom-6 top-14 rounded-xl border bg-card/80 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-border" />
                  <span className="size-2 rounded-full bg-border" />
                  <span className="size-2 rounded-full bg-border" />
                </div>
                <div className="mt-4 h-2 w-1/3 rounded-full bg-accent/40" />
                <div className="mt-4 flex items-end gap-2">
                  {[40, 68, 52, 84, 60, 74].map((h, i) => (
                    <span
                      key={i}
                      className="w-full rounded-t bg-accent/25"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded-full bg-muted" />
                  <div className="h-2 w-4/5 rounded-full bg-muted" />
                  <div className="h-2 w-3/5 rounded-full bg-muted" />
                </div>
              </div>
            </div>

            {chips.map((chip) => {
              const Icon = chip.icon;
              return (
                <div
                  key={chip.label}
                  className={cn(
                    "absolute hidden items-center gap-2 rounded-xl border bg-card/90 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur sm:flex",
                    chip.pos,
                  )}
                >
                  <Icon className="size-4 text-accent" />
                  {chip.label}
                </div>
              );
            })}
          </div>
        </div>

        <dl className="mt-16 grid overflow-hidden rounded-2xl border bg-card shadow-sm divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="px-6 py-6 text-center">
              <dd className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </dd>
              <dt className="mt-1 text-xs text-muted-foreground">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
