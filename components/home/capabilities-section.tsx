import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Code2, Layers3 } from "lucide-react";

import { media } from "@/config/media";

const capabilities = [
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Tailored web and mobile applications that digitize operations and grow with your business.",
    image: media.capabilities.engineering,
    href: "/solutions",
  },
  {
    icon: BrainCircuit,
    title: "AI & Intelligent Systems",
    description:
      "Practical AI, intelligent workflows, and automation that unlock new possibilities for organizations.",
    image: media.capabilities.ai,
    href: "/labs",
  },
  {
    icon: Layers3,
    title: "Digital Platforms",
    description:
      "Scalable SaaS products and digital services built for modern businesses and communities.",
    image: media.capabilities.products,
    href: "/products",
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
            We design and build technology that solves real-world problems and
            creates lasting value.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="flex items-start justify-between p-6 pb-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <div className="px-6">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="relative mt-5 aspect-16/10 overflow-hidden">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
