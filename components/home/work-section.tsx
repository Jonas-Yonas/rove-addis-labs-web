import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function WorkSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium tracking-[0.18em] text-accent uppercase">
            Selected work
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Building for the real world.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          A growing portfolio of products and software solutions developed by
          Rove Addis Labs.
        </p>
      </div>

      <div className="mt-14">
        <Link
          href="/products/rove-addis"
          className="group block overflow-hidden rounded-2xl border border-border"
        >
          <div className="grid min-h-105 bg-[#0F2933] text-white lg:grid-cols-2">
            <div className="flex flex-col justify-between p-8 sm:p-12">
              <div>
                <span className="inline-flex rounded-full border border-[#28B5B1]/30 px-3 py-1 text-xs text-[#28B5B1]">
                  Mobility · Product
                </span>

                <h3 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
                  Rove Addis
                </h3>

                <p className="mt-5 max-w-md text-white/65">
                  A shared-commute platform designed around how people actually
                  move through Addis Ababa.
                </p>
              </div>

              <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#28B5B1]">
                View case study
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
            </div>

            <div className="relative min-h-70 overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(40,181,177,0.25),transparent_45%)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl font-bold tracking-[-0.08em]">
                    R<span className="text-[#28B5B1]">O</span>VE
                  </div>

                  <p className="mt-2 text-sm tracking-[0.25em] text-white/50 uppercase">
                    Addis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
