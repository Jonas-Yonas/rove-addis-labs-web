import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Layers3,
  RefreshCw,
} from "lucide-react";

import { BrandGlyph, DotGrid } from "@/components/public/decor";
import { PublicHero } from "@/components/public/public-hero";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Custom software, digital transformation, and product development from Rove Addis Labs.",
};

const solutions = [
  {
    number: "01",
    icon: Code2,
    title: "Custom Software",
    description:
      "Purpose-built applications and platforms designed around your organization's workflows and goals — not off-the-shelf compromises.",
    points: [
      "Internal tools and operational platforms",
      "Customer-facing web and mobile apps",
      "System integrations and automation",
    ],
  },
  {
    number: "02",
    icon: RefreshCw,
    title: "Digital Transformation",
    description:
      "Modernize processes, connect systems, and create better digital experiences for the people who use them every day.",
    points: [
      "Process mapping and workflow redesign",
      "Legacy modernization and migration",
      "Data pipelines and reporting",
    ],
  },
  {
    number: "03",
    icon: Layers3,
    title: "Product Development",
    description:
      "From discovery and MVPs to production systems and continuous improvement — we help you build the right thing, then keep making it better.",
    points: [
      "Product discovery and prototyping",
      "MVP design and build",
      "Ongoing engineering and iteration",
    ],
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PublicHero
        eyebrow="Solutions"
        title="We solve problems, not just build software."
        description="Whether you're building something new or improving something that already exists, we work across product, engineering, and technology to deliver practical results."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = solution.icon;

            return (
              <div
                key={solution.number}
                className="relative overflow-hidden rounded-2xl border bg-card p-7"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 right-2 text-7xl font-bold text-foreground/[0.04]"
                >
                  {solution.number}
                </span>

                <span className="relative flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </span>

                <h2 className="relative mt-6 text-xl font-semibold tracking-tight">
                  {solution.title}
                </h2>
                <p className="relative mt-3 text-sm leading-6 text-muted-foreground">
                  {solution.description}
                </p>

                <ul className="relative mt-5 space-y-2.5 border-t pt-5 text-sm">
                  {solution.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl bg-[#0F2933] px-6 py-12 text-white sm:px-10 sm:py-14">
          <DotGrid className="text-white/10 mask-[radial-gradient(ellipse_50%_100%_at_0%_50%,black,transparent)]" />
          <BrandGlyph className="absolute -right-8 -bottom-10 size-56 text-[#28B5B1]/15" />

          <div className="relative max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Have something in mind?
            </h2>
            <p className="mt-2 text-white/65">
              Tell us what you&apos;re working on and we&apos;ll get back to you
              with how we can help.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-[#28B5B1] px-6 text-sm font-medium text-[#0F2933] transition-transform hover:-translate-y-0.5"
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
