import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PublicHero } from "@/components/public/public-hero";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "About",
  description: brand.positioning,
};

const beliefs = [
  {
    title: "Build for the real problem",
    body: "We start with the problem and the people who have it — the software is just how we solve it.",
  },
  {
    title: "Ship, then improve",
    body: "Working software in people's hands beats a perfect plan. We get to real quickly, then iterate.",
  },
  {
    title: "Local context, global standards",
    body: "Built in Addis Ababa, designed for everywhere. We understand the market we're in and hold ourselves to the bar of anywhere.",
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
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              What we do
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {brand.positioning} We work with businesses and organizations to
              design, build, and run software — and we build our own products
              alongside client work.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              {brand.name} is based in {brand.location}.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              What we believe
            </h2>
            <div className="grid gap-4">
              {beliefs.map((belief) => (
                <div
                  key={belief.title}
                  className="rounded-2xl border bg-card p-5"
                >
                  <h3 className="font-semibold">{belief.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                    {belief.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 rounded-2xl bg-[#0F2933] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
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
    </>
  );
}
