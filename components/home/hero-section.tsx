import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Boxes,
  Cloud,
  FlaskConical,
  FolderKanban,
  MapPin,
  Package,
} from "lucide-react";

import { media } from "@/config/media";
import { brand } from "@/config/brand";
import { getPublicCounts } from "@/lib/public/queries";

const floatingCards = [
  {
    icon: Cloud,
    title: "SaaS Platforms",
    body: "Scalable, secure cloud products",
    className: "right-4 top-8 lg:-right-6",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    body: "Intelligent systems that drive efficiency",
    className: "right-6 top-1/2 lg:-right-10",
  },
  {
    icon: Boxes,
    title: "Digital Products",
    body: "User-centered products that create impact",
    className: "bottom-8 right-10 lg:-right-4",
  },
];

export async function HeroSection() {
  const counts = await getPublicCounts();

  const stats = [
    { icon: FolderKanban, value: `${counts.projects}+`, label: "Projects", show: counts.projects > 0 },
    { icon: Package, value: `${counts.products}+`, label: "Products", show: counts.products > 0 },
    { icon: FlaskConical, value: `${counts.experiments}+`, label: "Labs", show: counts.experiments > 0 },
    { icon: MapPin, value: "Addis Ababa", label: "Where we build", show: true },
  ].filter((stat) => stat.show);

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_0%,rgba(40,181,177,0.1),transparent_45%)]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-12 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:px-8 lg:pt-20 lg:pb-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-accent uppercase">
            {brand.name}
          </p>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            We build software that{" "}
            <span className="text-accent">moves ideas forward.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {brand.description}
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
              Let&apos;s talk
            </Link>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-border/70 pt-8 sm:grid-cols-4 sm:gap-x-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col gap-1">
                  <Icon className="size-4 text-accent" />
                  <dd className="text-lg font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl border bg-muted shadow-lg sm:aspect-16/12">
            <Image
              src={media.heroSkyline}
              alt="City skyline at dusk"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-tr from-[#0F2933]/45 via-transparent to-transparent" />
          </div>

          {floatingCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={`absolute hidden w-52 rounded-xl border bg-card/95 p-3 shadow-xl backdrop-blur sm:block ${card.className}`}
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-4" />
                </span>
                <p className="mt-2 text-sm font-semibold">{card.title}</p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                  {card.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
