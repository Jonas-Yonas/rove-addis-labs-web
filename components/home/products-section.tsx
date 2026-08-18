import Link from "next/link";
import { ArrowRight, CarFront } from "lucide-react";

import { brand } from "@/config/brand";

export function ProductsSection() {
  return (
    <section className="bg-[#0F2933] text-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-[#28B5B1] uppercase">
              Our products
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Products we believe should exist.
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#28B5B1] transition-colors hover:text-white"
          >
            View all products
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/4">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="min-h-90 p-8 sm:p-12">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#28B5B1]/10 text-[#28B5B1]">
                <CarFront className="size-6" />
              </div>

              <p className="mt-10 text-sm font-medium text-[#28B5B1]">
                First live product
              </p>

              <h3 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                {brand.productName}
              </h3>

              <p className="mt-4 text-xl text-white/80">
                Your Addis commute, shared.
              </p>

              <p className="mt-6 max-w-xl leading-7 text-white/60">
                A community-driven mobility platform connecting people traveling
                in the same direction across Addis Ababa.
              </p>

              <Link
                href="/products/rove-addis"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#28B5B1] px-5 py-2.5 text-sm font-medium text-[#0F2933] transition-transform hover:-translate-y-0.5"
              >
                Explore Rove Addis
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="relative hidden min-h-90 overflow-hidden lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(40,181,177,0.25),transparent_45%)]" />

              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.3),transparent)]" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-48 items-center justify-center rounded-full border border-[#28B5B1]/30 bg-[#28B5B1]/5">
                  <div className="flex size-32 items-center justify-center rounded-full border border-[#28B5B1]/40 bg-[#0F2933] text-4xl font-bold">
                    R<span className="text-[#28B5B1]">O</span>VE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
