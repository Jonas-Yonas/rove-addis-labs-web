import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8 lg:pb-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0F2933] px-6 py-20 text-white sm:px-12 lg:px-20 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-[0.18em] text-[#28B5B1] uppercase">
            Let&apos;s build
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
            Have an idea worth building?
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Whether you need a software solution, want to build a product, or
            are exploring what AI can do for your business, let&apos;s talk.
          </p>

          <Link
            href="/contact"
            className="mt-9 inline-flex h-11 items-center gap-2 rounded-md bg-[#28B5B1] px-6 text-sm font-medium text-[#0F2933] transition-transform hover:-translate-y-0.5"
          >
            Start a conversation
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
