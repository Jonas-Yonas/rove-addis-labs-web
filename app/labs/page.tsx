import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";

import { SectionCta } from "@/components/public/section-cta";
import { getActiveExperiments } from "@/lib/public/queries";
import { media } from "@/config/media";

export const metadata: Metadata = {
  title: "Labs",
  description: "Experiments and prototypes from Rove Addis Labs.",
};

export default async function LabsPage() {
  const experiments = await getActiveExperiments();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
          <Image
            src={media.labsHero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="58vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-r from-background from-15% via-background/70 via-45% to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl py-14 sm:py-20 lg:py-28">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Labs
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Exploring the future.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our labs are where ideas come to life. We experiment, prototype
              emerging technology, and turn the promising ideas into practical
              software.
            </p>
          </div>

          <div className="relative -mx-4 mb-4 aspect-16/10 overflow-hidden sm:-mx-6 lg:hidden">
            <Image
              src={media.labsHero}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {experiments.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed py-20 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <FlaskConical className="size-5" />
            </span>
            <p className="mt-4 font-medium">Nothing in the lab right now</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              New experiments will show up here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((experiment, index) => (
              <Link
                key={experiment.id}
                href={`/labs/${experiment.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F2933] text-white transition-all duration-200 hover:-translate-y-1 hover:border-[#28B5B1]/40 hover:shadow-lg"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <Image
                    src={
                      experiment.cover_image_url ??
                      media.labsFallbacks[index % media.labsFallbacks.length]
                    }
                    alt=""
                    fill
                    className="object-cover opacity-90 transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0F2933] via-[#0F2933]/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-[#28B5B1]/30 bg-[#0F2933]/70 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-[#28B5B1] uppercase backdrop-blur">
                    {experiment.status}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="text-lg font-semibold tracking-tight">
                    {experiment.title}
                  </h2>
                  {experiment.summary && (
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-white/65">
                      {experiment.summary}
                    </p>
                  )}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#28B5B1]">
                    Explore lab
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <SectionCta
          title="Want to explore something with us?"
          description="If one of these sparks an idea, we're all ears."
          cta="Get in touch"
        />
      </div>
    </>
  );
}
