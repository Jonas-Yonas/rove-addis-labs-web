import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  FlaskConical,
  FolderKanban,
  Lightbulb,
  MapPin,
  Package,
  Sparkles,
} from "lucide-react";

import { media } from "@/config/media";
import { brand } from "@/config/brand";
import { getPublicCounts } from "@/lib/public/queries";

const floatingCards = [
  { icon: Lightbulb, title: "Innovative Solutions", pos: "left-3 top-[22%]" },
  {
    icon: Cloud,
    title: "Digital Transformation",
    pos: "right-3 top-[14%]",
  },
  { icon: MapPin, title: "Made for Ethiopia", pos: "right-8 bottom-[20%]" },
];

export async function HeroSection() {
  const counts = await getPublicCounts();

  const stats = [
    {
      icon: Package,
      value: `${Math.max(counts.products, 1)}+`,
      label: "Products & platforms",
    },
    {
      icon: FolderKanban,
      value: `${Math.max(counts.projects, 1)}+`,
      label: "Projects delivered",
    },
    {
      icon: FlaskConical,
      value: `${Math.max(counts.experiments, 1)}+`,
      label: "Experiments",
    },
    { icon: Sparkles, value: "100%", label: "Addis-built team" },
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Full-bleed skyline on the right */}
      <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block xl:w-[48%]">
        <Image
          src={media.heroSkyline}
          alt="Addis Ababa skyline"
          fill
          priority
          className="object-cover"
          sizes="48vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/35 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background/50 to-transparent" />

        <span className="absolute left-6 top-6 rounded-md bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {brand.location}
        </span>

        {floatingCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`absolute flex items-center gap-2.5 rounded-xl border bg-card/95 px-3.5 py-2.5 text-sm font-semibold shadow-xl backdrop-blur ${card.pos}`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Icon className="size-4" />
              </span>
              {card.title}
            </div>
          );
        })}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl py-14 sm:py-20 lg:py-28">
          <div className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            <span className="h-px w-8 bg-accent" />
            Building what matters
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Technology for{" "}
            <span className="text-accent">a smarter Ethiopia.</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {brand.name} builds software products, digital solutions, and
            intelligent systems that power businesses, organizations, and
            communities.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/work"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-medium text-accent-foreground transition-transform hover:-translate-y-0.5"
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

        {/* Mobile image */}
        <div className="relative -mx-4 mb-4 aspect-16/10 overflow-hidden sm:-mx-6 lg:hidden">
          <Image
            src={media.heroSkyline}
            alt="Addis Ababa skyline"
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>

      {/* Overlapping stats card */}
      <div className="relative z-10 mx-auto -mb-10 max-w-4xl px-4 sm:px-6 lg:-mb-12 lg:px-8">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border bg-card shadow-xl sm:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`px-5 py-6 text-center ${
                  index % 2 === 1 ? "border-l" : ""
                } ${index >= 2 ? "border-t sm:border-t-0" : ""} ${
                  index >= 1 ? "sm:border-l" : ""
                }`}
              >
                <Icon className="mx-auto size-4 text-accent" />
                <dd className="mt-2 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
                <dt className="mt-0.5 text-xs text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
      <div className="h-12 bg-muted/30 lg:h-14" />
    </section>
  );
}
