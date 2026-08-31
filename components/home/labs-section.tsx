import Link from "next/link";
import { ArrowUpRight, Bot, Workflow, FlaskConical } from "lucide-react";

const experiments = [
  {
    icon: Bot,
    title: "AI Applications",
    description:
      "Exploring practical ways AI can improve products, workflows, and user experiences.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description:
      "Investigating intelligent workflows and automation that can remove repetitive business processes.",
  },
  {
    icon: FlaskConical,
    title: "Experimental Systems",
    description:
      "Prototyping emerging technologies and testing ideas before turning them into products.",
  },
];

export function LabsSection() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Rove Labs
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Exploring what&apos;s next.
            </h2>

            <p className="mt-6 max-w-lg leading-7 text-muted-foreground">
              Rove Labs is where we explore emerging technologies, experiment
              with AI, and turn promising ideas into practical software.
            </p>

            <Link
              href="/labs"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              Explore the Labs
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4">
            {experiments.map((experiment) => {
              const Icon = experiment.icon;

              return (
                <article
                  key={experiment.title}
                  className="group rounded-xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40"
                >
                  <div className="flex gap-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{experiment.title}</h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {experiment.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
