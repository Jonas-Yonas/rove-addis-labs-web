import { BrainCircuit, Code2, Layers3, Rocket } from "lucide-react";

import { BrandGlyph } from "@/components/public/decor";

const capabilities = [
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Modern web applications, business platforms, APIs, and scalable software systems built around real-world requirements.",
  },
  {
    icon: Layers3,
    title: "Digital Products",
    description:
      "We turn ideas into usable products, from early concepts and MVPs to production-ready platforms.",
  },
  {
    icon: Rocket,
    title: "SaaS & Platforms",
    description:
      "Multi-user products and subscription-ready platforms designed for reliability, maintainability, and growth.",
  },
  {
    icon: BrainCircuit,
    title: "AI & Automation",
    description:
      "Practical applications of AI, intelligent workflows, and automation as our capabilities continue to evolve.",
  },
];

export function CapabilitiesSection() {
  return (
    <section className="border-y border-border/70 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            What we do
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            From ideas to impact.
          </h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            From client solutions to our own products, we combine engineering,
            product thinking, and emerging technology to solve meaningful
            problems.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative h-32 overflow-hidden bg-linear-to-br from-accent/15 to-accent/5">
                  <BrandGlyph className="absolute -right-6 -bottom-8 size-28 text-accent/20" />
                  <span className="absolute top-6 left-6 flex size-11 items-center justify-center rounded-xl border border-accent/20 bg-background text-accent shadow-sm">
                    <Icon className="size-5" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
