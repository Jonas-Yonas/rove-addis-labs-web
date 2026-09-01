import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Layers,
  MapPin,
  Rocket,
  Target,
} from "lucide-react";

import { BrandGlyph, DotGrid } from "@/components/public/decor";
import { PublicHero } from "@/components/public/public-hero";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "About",
  description: brand.positioning,
};

const facts = [
  { icon: MapPin, label: "Based in", value: brand.location },
  { icon: Layers, label: "Focus", value: "Software, products & intelligent systems" },
  { icon: Target, label: "How we work", value: "Client solutions + our own products" },
];

const beliefs = [
  {
    icon: Target,
    title: "Build for the real problem",
    body: "We start with the problem and the people who have it — the software is just how we solve it.",
  },
  {
    icon: Rocket,
    title: "Ship, then improve",
    body: "Working software in people's hands beats a perfect plan. We get to real quickly, then iterate.",
  },
  {
    icon: Compass,
    title: "Local context, global standards",
    body: "Built in Addis Ababa, designed for everywhere. We know the market we're in and hold ourselves to the bar of anywhere.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PublicHero
        eyebrow="About"
        title="A software product and solutions company, based in Addis Ababa."
        description={brand.description}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <div
                key={fact.label}
                className="rounded-2xl border bg-card p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                  {fact.label}
                </p>
                <p className="mt-1.5 font-medium">{fact.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What we do</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {brand.positioning} We work with businesses and organizations to
              design, build, and run software — and we build our own products
              alongside client work.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              {brand.name} is based in {brand.location}.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              What we believe
            </h2>
            <div className="grid gap-4">
              {beliefs.map((belief) => {
                const Icon = belief.icon;
                return (
                  <div
                    key={belief.title}
                    className="flex gap-4 rounded-2xl border bg-card p-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{belief.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {belief.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-2xl bg-[#0F2933] p-8 text-white sm:p-12">
          <DotGrid className="text-white/10 mask-[radial-gradient(ellipse_60%_100%_at_100%_0%,black,transparent)]" />
          <BrandGlyph className="absolute -left-10 -bottom-12 size-60 text-[#28B5B1]/12" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                Want to work with us?
              </h2>
              <p className="mt-1 text-white/65">
                We&apos;re always up for a conversation about what you&apos;re
                building.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-[#28B5B1] px-6 text-sm font-medium text-[#0F2933] transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
