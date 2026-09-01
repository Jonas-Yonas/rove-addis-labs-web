import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Compass,
  HeartHandshake,
  MapPin,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";

import { BrandGlyph, DotGrid } from "@/components/public/decor";
import { PublicHero } from "@/components/public/public-hero";
import { getPublicCounts } from "@/lib/public/queries";
import { brand } from "@/config/brand";
import { media } from "@/config/media";

export const metadata: Metadata = {
  title: "About",
  description: brand.positioning,
};

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    body: "We explore new ideas and technologies, and turn the promising ones into real software.",
  },
  {
    icon: HeartHandshake,
    title: "Quality",
    body: "We deliver reliable, well-built software — and we stand behind what we ship.",
  },
  {
    icon: Compass,
    title: "Impact",
    body: "We build things that make a measurable difference for the people who use them.",
  },
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
];

export default async function AboutPage() {
  const counts = await getPublicCounts();

  const stats = [
    { icon: CalendarDays, value: brand.founded, label: "Founded" },
    { icon: MapPin, value: "Addis Ababa", label: "Based in Ethiopia" },
    {
      icon: Rocket,
      value: `${Math.max(counts.projects, 1)}+`,
      label: "Projects delivered",
    },
    { icon: HeartHandshake, value: "100%", label: "Client commitment" },
  ];

  return (
    <>
      <PublicHero
        eyebrow="About us"
        title="Driven by purpose. Built on excellence."
        description={brand.description}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A software company with a point of view.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              {brand.positioning} We partner with businesses and organizations to
              build digital solutions that create value and drive progress — and
              we build our own products alongside that work.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              {brand.name} is based in {brand.location}.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title}>
                    <span className="flex size-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-4" />
                    </span>
                    <p className="mt-3 text-sm font-semibold">{value.title}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {value.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border bg-muted shadow-sm">
            <Image
              src={media.about}
              alt="The Rove Addis Labs team at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized
            />
          </div>
        </div>

        <dl className="mt-14 grid overflow-hidden rounded-2xl border bg-card shadow-sm divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col gap-1.5 px-6 py-6">
                <Icon className="size-4 text-accent" />
                <dd className="text-xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              </div>
            );
          })}
        </dl>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">
            What we believe
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

        <div className="relative mt-14 overflow-hidden rounded-2xl bg-[#0F2933] p-8 text-white sm:p-12">
          <DotGrid className="text-white/10 mask-[radial-gradient(ellipse_60%_100%_at_100%_0%,black,transparent)]" />
          <BrandGlyph className="absolute -bottom-12 -left-10 size-60 text-[#28B5B1]/12" />

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
