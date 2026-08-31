import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PublicHero } from "@/components/public/public-hero";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Custom software, digital transformation, and product development from Rove Addis Labs.",
};

const solutions = [
  {
    number: "01",
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
        <div className="divide-y divide-border border-y border-border">
          {solutions.map((solution) => (
            <div
              key={solution.number}
              className="grid gap-6 py-10 md:grid-cols-[80px_1fr]"
            >
              <span className="text-sm font-medium text-accent">
                {solution.number}
              </span>

              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {solution.title}
                </h2>
                <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
                  {solution.description}
                </p>
                <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                  {solution.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border bg-card p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Have something in mind?
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Tell us what you&apos;re working on and we&apos;ll get back to you
            with how we can help.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
