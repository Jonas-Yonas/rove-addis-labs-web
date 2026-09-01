import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { BrandGlyph, DotGrid } from "@/components/public/decor";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${brand.name}.`,
};

const details = [
  brand.contact.email && {
    icon: Mail,
    label: "Email",
    value: brand.contact.email,
    href: `mailto:${brand.contact.email}`,
  },
  brand.contact.phone && {
    icon: Phone,
    label: "Phone",
    value: brand.contact.phone,
    href: `tel:${brand.contact.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: brand.location,
  },
  brand.contact.hours && {
    icon: Clock,
    label: "Working hours",
    value: brand.contact.hours,
  },
].filter(Boolean) as {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}[];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <DotGrid className="mask-[radial-gradient(ellipse_50%_60%_at_15%_0%,black,transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_12%,rgba(40,181,177,0.11),transparent_38%)]" />
      <BrandGlyph className="absolute -bottom-24 -left-16 -z-10 size-80 text-accent/6" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-lg">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Let&apos;s talk
            </p>

            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s build something great together.
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Have a project in mind or want to learn more about our work?
              We&apos;d love to hear from you.
            </p>

            <dl className="mt-10 space-y-5 border-t border-border/70 pt-8">
              {details.map((detail) => {
                const Icon = detail.icon;
                return (
                  <div key={detail.label} className="flex items-start gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {detail.label}
                      </dt>
                      <dd className="mt-0.5 text-sm font-medium">
                        {detail.href ? (
                          <a href={detail.href} className="hover:text-accent">
                            {detail.value}
                          </a>
                        ) : (
                          detail.value
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
