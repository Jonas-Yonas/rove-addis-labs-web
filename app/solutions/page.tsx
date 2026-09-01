import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Cloud,
  Code2,
  Smartphone,
} from "lucide-react";

import { BrandGlyph, DotGrid } from "@/components/public/decor";
import { PublicHero } from "@/components/public/public-hero";
import { media } from "@/config/media";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Custom software, mobile apps, SaaS platforms, and system integration from Rove Addis Labs.",
};

const solutions = [
  {
    icon: Code2,
    title: "Web Applications",
    description:
      "Robust, scalable, and secure web applications built with modern technologies and built to last.",
    image: media.solutions.web,
  },
  {
    icon: Smartphone,
    title: "Mobile Solutions",
    description:
      "Cross-platform mobile apps that deliver seamless experiences on every device.",
    image: media.solutions.mobile,
  },
  {
    icon: Cloud,
    title: "SaaS Platforms",
    description:
      "End-to-end SaaS products that scale with your business — from architecture to launch.",
    image: media.solutions.saas,
  },
  {
    icon: Blocks,
    title: "System Integration",
    description:
      "Seamlessly connect systems and automate the workflows that run your organization.",
    image: media.solutions.integration,
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PublicHero
        eyebrow="Solutions"
        title="Solutions that drive real impact."
        description="We design and build custom digital solutions tailored to your business challenges and goals."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <Link
                key={solution.title}
                href="/contact"
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative aspect-16/11 overflow-hidden bg-muted">
                  <Image
                    src={solution.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    unoptimized
                  />
                  <span className="absolute left-4 top-4 flex size-9 items-center justify-center rounded-lg border border-accent/20 bg-background/95 text-accent shadow-sm backdrop-blur">
                    <Icon className="size-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-semibold tracking-tight">
                    {solution.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                    {solution.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl bg-[#0F2933] px-6 py-12 text-white sm:px-10 sm:py-14">
          <DotGrid className="text-white/10 mask-[radial-gradient(ellipse_50%_100%_at_0%_50%,black,transparent)]" />
          <BrandGlyph className="absolute -bottom-10 -right-8 size-56 text-[#28B5B1]/15" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Not sure where to start?
              </h2>
              <p className="mt-2 text-white/65">
                Tell us what you&apos;re working on and we&apos;ll help you scope
                the right solution.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-[#28B5B1] px-6 text-sm font-medium text-[#0F2933] transition-transform hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
