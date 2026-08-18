import { BrainCircuit, Code2, Layers3, Rocket } from "lucide-react";

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
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
            What we do
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Technology built around outcomes.
          </h2>

          <p className="mt-5 text-muted-foreground sm:text-lg">
            From client solutions to our own products, we combine engineering,
            product thinking, and emerging technology to solve meaningful
            problems.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="bg-background p-7 transition-colors hover:bg-muted/40"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-6 font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
