import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { brand } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${brand.name}.`,
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_15%,rgba(40,181,177,0.1),transparent_35%)]" />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
              Let&apos;s talk
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Have an idea worth building?
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Whether you need a software solution, want to build a product, or
              are exploring what AI can do for your business — tell us what
              you&apos;re working on and we&apos;ll get back to you.
            </p>

            <dl className="mt-10 space-y-4 border-t border-border/70 pt-8 text-sm">
              {brand.contact.email && (
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-accent" />
                  <dd>
                    <a
                      href={`mailto:${brand.contact.email}`}
                      className="hover:underline"
                    >
                      {brand.contact.email}
                    </a>
                  </dd>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPin className="size-4 text-accent" />
                <dd className="text-muted-foreground">{brand.location}</dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
