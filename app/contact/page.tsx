import type { Metadata } from "next";
import { MapPin, MessageSquare, Send, Sparkles } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { BrandGlyph, DotGrid } from "@/components/public/decor";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${brand.name}.`,
};

const steps = [
  {
    icon: Send,
    title: "You send us the basics",
    body: "A few lines about what you're building or the problem you're trying to solve.",
  },
  {
    icon: MessageSquare,
    title: "We reply by email",
    body: "Usually within a couple of working days, with questions or next steps.",
  },
  {
    icon: Sparkles,
    title: "We scope it together",
    body: "A short call to figure out whether — and how — we can help.",
  },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <DotGrid className="mask-[radial-gradient(ellipse_50%_60%_at_15%_0%,black,transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_12%,rgba(40,181,177,0.11),transparent_38%)]" />
      <BrandGlyph className="absolute -bottom-20 -left-16 -z-10 size-80 text-accent/[0.06]" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Let&apos;s talk
            </p>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Have an idea worth building?
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Whether you need a software solution, want to build a product, or
              are exploring what AI can do for your business — tell us what
              you&apos;re working on and we&apos;ll get back to you.
            </p>

            <ol className="mt-10 space-y-5 border-t border-border/70 pt-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="flex gap-4">
                    <span className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-4" />
                      <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                        {index + 1}
                      </span>
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="mt-0.5 text-sm leading-6 text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" />
              {brand.location}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
