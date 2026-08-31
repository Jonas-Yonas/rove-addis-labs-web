import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const pillars = [
  "Software Products",
  "SaaS Platforms",
  "Digital Solutions",
  "AI & Automation",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_18%,rgba(40,181,177,0.14),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-accent" />
            Software · Products · Intelligent Systems
          </div>

          <h1 className="text-balance text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem] lg:leading-[0.98]">
            We build software that{" "}
            <span className="text-accent">moves ideas forward.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Rove Addis Labs builds digital products, SaaS platforms, custom
            software solutions, and intelligent systems for businesses and
            organizations in Ethiopia and beyond.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:opacity-90"
            >
              Explore our work
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-muted"
            >
              Work with us
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-4xl border-t border-border/70 pt-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            What we build
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {pillars.map((pillar) => (
              <li
                key={pillar}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <span className="size-1.5 rounded-full bg-accent" />
                {pillar}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
