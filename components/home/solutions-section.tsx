import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const solutions = [
  {
    number: "01",
    title: "Custom Software",
    description:
      "Purpose-built applications and platforms designed around your organization's workflows and goals.",
  },
  {
    number: "02",
    title: "Digital Transformation",
    description:
      "Modernize processes, connect systems, and create better digital experiences for customers and teams.",
  },
  {
    number: "03",
    title: "Product Development",
    description:
      "From product discovery and MVPs to production systems and continuous improvement.",
  },
];

export function SolutionsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
            Solutions
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            We solve problems, not just build software.
          </h2>
        </div>

        <p className="max-w-md text-muted-foreground lg:pt-10">
          Whether you&apos;re building something new or improving something that
          already exists, we work across product, engineering, and technology to
          deliver practical solutions.
        </p>
      </div>

      <div className="mt-16 divide-y divide-border border-y border-border">
        {solutions.map((solution) => (
          <Link
            key={solution.number}
            href="/solutions"
            className="group grid gap-5 py-8 transition-colors md:grid-cols-[80px_1fr_auto] md:items-center"
          >
            <span className="text-sm font-medium text-accent">
              {solution.number}
            </span>

            <div>
              <h3 className="text-xl font-semibold transition-colors group-hover:text-accent sm:text-2xl">
                {solution.title}
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {solution.description}
              </p>
            </div>

            <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>
    </section>
  );
}
