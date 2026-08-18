import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(40,181,177,0.12),transparent_32%)]" />

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pb-32 sm:pt-28 lg:px-8 lg:pb-40 lg:pt-32">
        <div className="max-w-4xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="size-3.5 text-accent" />
            Software · Products · Intelligent Systems
          </div>

          <h1 className="text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-8xl">
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
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Work with us
            </Link>
          </div>
        </div>

        <div className="mt-20 grid max-w-4xl grid-cols-2 gap-4 border-t border-border/70 pt-8 sm:grid-cols-4">
          {[
            "Software Products",
            "SaaS Platforms",
            "Digital Solutions",
            "AI & Automation",
          ].map((item) => (
            <div key={item} className="text-sm text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
