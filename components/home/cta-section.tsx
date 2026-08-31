import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0F2933] px-6 py-16 text-white sm:px-12 sm:py-20 lg:px-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_15%_20%,rgba(40,181,177,0.22),transparent_40%),radial-gradient(circle_at_90%_90%,rgba(40,181,177,0.14),transparent_45%)]"
        />

        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#28B5B1] uppercase">
            Let&apos;s build
          </p>

          <h2 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Have an idea worth building?
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
            Whether you need a software solution, want to build a product, or are
            exploring what AI can do for your business, let&apos;s talk.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#28B5B1] px-6 text-sm font-medium text-[#0F2933] transition-transform hover:-translate-y-0.5"
            >
              Start a conversation
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/solutions"
              className="inline-flex h-11 items-center justify-center rounded-md border border-white/15 px-6 text-sm font-medium text-white/90 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              See what we do
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
